import { Component, EventEmitter, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { RoomInfoService } from 'src/app/services/room-info/room-info.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
  code: string = '';
  name: string = '';
  @Output() roomCreationCodeEvent = new EventEmitter();

  constructor(
    private modalService: NgbModal,
    private roominfoService: RoomInfoService,
    public activeModal: NgbActiveModal
  ) { }

  ngOnInit(): void {
  }

  checkCode(){
    const newRoomData = {
      name: this.name,
      isCreationCode: this.code === 'SNJT'
    }
    this.activeModal.close(newRoomData);
  }
}
