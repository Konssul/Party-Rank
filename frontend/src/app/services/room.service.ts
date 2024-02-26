import { Injectable } from '@angular/core';
import { Stomp } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';


/*Entre otras cosas, se debería añadir un método simple para desconectar a los usuarios
Además (principalmente desde el backend) se debe controlar que un mismo usuario no pueda acceder a varias salas*/


@Injectable({
  providedIn: 'root'
})
export class RoomService {

  private stompClient: any;
  private isConnected: boolean = false;

  nextVideoIndexSubject: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  nextVideoIndex$:Observable<number> = this.nextVideoIndexSubject.asObservable();

  constructor(private router: Router) { 
    this.nextVideoIndexSubject.next(0);

  }

  initConnectSocket(): Promise<void> {
    const url = '//localhost:8181/ws';
    const socket = new SockJS(url);
    this.stompClient = Stomp.over(socket);

    return new Promise<void>((resolve, reject) => {
      this.stompClient.connect({}, () => {
        this.isConnected = true;
        resolve();
      }, (error: any) => {
        this.isConnected = false;
        reject(error);
      });
    });
  }


  //Puede ser que si llegan varios RoomCreation/Join a la vez se crucen
  
  createRoom(roomName: string, password:string) {
    console.log("ENTRAENCREATE");
    this.initConnectSocket().then(() => {
      const stompSubscription = this.stompClient.subscribe('/topic/roomCreation', (message: { body: string }) => {
        console.log("ENTRAENCREATE");
        if (message.body === 'roomAlready') {
          console.log('La sala ya existe, no se realizará la conexión.');
          stompSubscription.unsubscribe();
        } else {
          stompSubscription.unsubscribe();
          const room = JSON.parse(message.body);
          console.log('Nueva sala creada:', room);
          this.stompClient.subscribe('/topic/' + roomName, (message: { body: string }) => this.handleRoomMessage(message));
          this.router.navigate(['room', roomName], { state: { roomName, isAdmin:true }});
        }
      });

      this.stompClient.send('/app/createRoom/' + roomName, {}, password);
    }).catch(error => {
      console.error('Error al conectar:', error);
      this.router.navigate(['']);
    });
  }

  
  joinRoom(roomName: string, password: string) {
    console.log("ENTRAENJOIN");
    this.initConnectSocket().then(() => {
        console.log("CONECTA");
        
        const stompSubscription = this.stompClient.subscribe('/topic/joinTry', (message: { body: string }) => {
          console.log("MESSAGEBODY", message.body);
            
            if (message.body == 'true') {
                console.log('Usuario Nuevo');
                this.stompClient.subscribe('/topic/' + roomName, (message: { body: string }) => this.handleRoomMessage(message));
                this.router.navigate(['room', roomName], { state: { roomName, isAdmin:false }});
            } else {
                console.log('Parámetros no cumplidos');
            }

            stompSubscription.unsubscribe();
        });

        this.stompClient.send('/app/joinRoom', {}, JSON.stringify({ roomName, password }));
    });
}


handleRoomMessage(message: { body: string }): void {
  console.log('Mensaje recibido:', message.body);
  if (message.body.startsWith("nextVideoIndex:")) {
    const nextVideoIndex = parseInt(message.body.split(":")[1].trim(), 10);
    console.log(nextVideoIndex + "  " + this.nextVideoIndexSubject );
    this.nextVideoIndexSubject.next(nextVideoIndex);
  
  }
}

nextVideoService(roomName: string, nextVideoIndex: number): Promise<void> {
  return new Promise<void>((resolve) => {
    this.stompClient.send('/app/room/' + roomName, {}, "nextVideoIndex:" + nextVideoIndex);
    resolve();
  });
}



  IsConnected(): boolean {
    return this.isConnected;
  }
}
