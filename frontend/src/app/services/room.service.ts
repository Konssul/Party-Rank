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

  initConnectSocket(roomName: string): Promise<void> {
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
    this.initConnectSocket(roomName).then(() => {
      const stompSubscription = this.stompClient.subscribe('/topic/' + roomName, (message: { body: string }) => {

        if (message.body === 'roomAlready') {
          console.log('La sala ya existe, no se realizará la conexión.');
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


  IsConnected(): boolean {
    return this.isConnected;
  }
}
