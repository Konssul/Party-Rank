import { Injectable } from '@angular/core';
import { Stomp } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  private stompClient: any;
  private isConnected: boolean = false;


  constructor(private router: Router) { }

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

  createRoom(roomName: string, password:string) {
    console.log("ENTRAENCREATE");
    this.initConnectSocket().then(() => {
      const stompSubscription = this.stompClient.subscribe('/topic/' + roomName, (message: { body: string }) => {

        if (message.body === 'roomAlready') {
          console.log('La sala ya existe, no se realizará la conexión.');
          this.stompClient.unsubscribe();
        } else {
          const room = JSON.parse(message.body);
          console.log('Nueva sala creada:', room);
          this.router.navigate(['/room', roomName]);
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
        
        // Suscríbete al tema joinTry antes de enviar el mensaje
        const stompSubscription = this.stompClient.subscribe('/topic/joinTry', (message: { body: string }) => {
          console.log("MESSAGEBODY", message.body);
            
            if (message.body == 'true') {
                console.log('Usuario Nuevo');
                this.stompClient.subscribe('/topic/' + roomName);
                this.router.navigate(['/room', roomName]);
            } else {
                console.log('Parámetros no cumplidos');
            }

            // Desuscribirse después de recibir la respuesta
            stompSubscription.unsubscribe();
        });

        // Ahora envía el mensaje
        this.stompClient.send('/app/joinRoom', {}, JSON.stringify({ roomName, password }));
    });
}



  IsConnected(): boolean {
    return this.isConnected;
  }
}
