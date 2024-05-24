import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { RoomInfoService } from 'src/app/services/room-info/room-info.service';
import { ModalComponent } from '../modal/modal.component';
import { ApiService } from 'src/app/services/api-service/api.service';

interface RoomInfo {
  _id: string,
  name: string,
  description?: string,
  createAt?: string
}
@Component({
  selector: 'app-room-card',
  templateUrl: './room-card.component.html',
  styleUrls: ['./room-card.component.scss']
})

export class RoomCardComponent implements OnInit {
  @ViewChild('modal')
  private modalComponent!: ModalComponent;
  roomsInfo!:RoomInfo[];
  roomCreationCode!: string;
  modalRef!: NgbModalRef;
  constructor(
    private roomInfoService: RoomInfoService,
    private router: Router,
    private modalService: NgbModal,
    private apiService: ApiService
  ) { }

  ngOnInit(): void {
    this.apiService.getRoomInfo().subscribe((data)=>{
      console.log('RoomInfo: ', data);
      this.roomsInfo = data;
    })
  }

  setRoomInfo(singleRoomInfo:any){
    this.roomInfoService.roomInfo = singleRoomInfo;
    this.router.navigate(['/chat']);
  }

  openModal(){
    this.modalRef = this.modalService.open(ModalComponent);
    this.modalRef.result.then((newRoomData)=>{
      if(newRoomData.isCreationCode){
        const roomInfo = {
          name: newRoomData.name
        }
        this.apiService.addRoom(roomInfo).subscribe((data)=>{
          this.roomsInfo.push({
            _id: data._id,
            name: data.name
          })
        })
      }
    })
  }

  deleteRoom(idx:number, roomId: string){
    this.apiService.deleteRoom(roomId).subscribe((data)=>{
      this.roomsInfo.splice(idx, 1);
    })
  }
}
