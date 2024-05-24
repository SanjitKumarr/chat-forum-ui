import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RoomInfoService {
  _roomInfo:any;
  _roomCreationCode: any;

  constructor() { }

  public set roomInfo(roomInfo:any) {
    this._roomInfo = roomInfo;
  }
  public get roomInfo(){
    return this._roomInfo;
  }
}
