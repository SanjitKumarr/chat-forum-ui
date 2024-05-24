import { Component, OnInit } from '@angular/core';
import { SocketService } from './services/socket-service/socket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'chat-forum-tool-ui';
  
  constructor(private socketService: SocketService){
  }
  ngOnInit(): void {
  }
}
