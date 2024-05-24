import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { io } from 'socket.io-client'


@Injectable({
  providedIn: 'root'
})
export class SocketService {
  public message$: Subject<string> = new Subject();
  constructor() {}

  public socket = io('http://localhost:3000');

  public sendMessage(message: any, roomId: any) {
    console.log('sendMessage: ', message)
    this.socket.emit('send-message', message, roomId);
  }

  public getNewMessage = () => {
    this.socket.on('recieve-message', (message: any) =>{
      this.message$.next(message);
    });
    return this.message$.asObservable();
  };

  public joinRoom(roomId: string){
    this.socket.emit('join',roomId);
  }

  public leaveRoom(roomId: string){
    this.socket.emit('leave',roomId);
  }
}
