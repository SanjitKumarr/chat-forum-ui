import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ApiService } from 'src/app/services/api-service/api.service';
import { RoomInfoService } from 'src/app/services/room-info/room-info.service';
import { SocketService } from 'src/app/services/socket-service/socket.service';

@Component({
  selector: 'app-chat-card',
  templateUrl: './chat-card.component.html',
  styleUrls: ['./chat-card.component.scss']
})
export class ChatCardComponent implements OnInit, OnDestroy {
  roomInfo: any;
  messages: any = [];
  private newMessageSubscription!: Subscription;
  private roomDataSubscription!: Subscription;
  private updateMessageSubscription!: Subscription;

  constructor(
    private roomInfoService: RoomInfoService,
    private router: Router,
    private socketService: SocketService,
    private apiService: ApiService
  ) { }

  ngOnInit(): void {
    if(this.roomInfoService.roomInfo){
      this.roomInfo = this.roomInfoService.roomInfo;
      localStorage.setItem('roomInfo', JSON.stringify(this.roomInfo));
    }else {
      this.roomInfo = JSON.parse(localStorage.getItem('roomInfo') as string);
    }
    this.roomDataSubscription = this.apiService.getRoomInfoById(this.roomInfo._id).subscribe((roomInfo) =>{
      this.messages = roomInfo.messages;
    });
    this.socketService.joinRoom(this.roomInfo._id);
    this.newMessageSubscription = this.socketService.getNewMessage().subscribe((message) => {
      this.messages.push(message);
    })
  }
  currentMessage(event : any){
    const message = event.target.value;
    this.messages.push(message);
    const roomID = this.roomInfo._id;
    this.updateMessageSubscription = this.apiService.setMessageForRoom(roomID, this.messages).subscribe((data)=>{
      this.socketService.sendMessage(message, this.roomInfo._id);
    },error => console.log(error))
    event.target.value = '';
  }
  backToRooms(){
    this.socketService.leaveRoom(this.roomInfo._id);
    this.router.navigate(['/room']);
  }

  ngOnDestroy(): void {
    this.socketService.socket.off('recieve-message');
    this.newMessageSubscription.unsubscribe();
    this.roomDataSubscription.unsubscribe();
    if(this.updateMessageSubscription){
      this.updateMessageSubscription.unsubscribe();
    }
  }
}
