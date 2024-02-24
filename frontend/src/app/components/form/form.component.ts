import { Component, ElementRef, EventEmitter, Output, ViewChild, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RoomComponent } from '../room/room.component';
import { HomeComponent } from '../home/home.component';
import { RoomService } from '../../services/room.service';
import { join } from 'path';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [ReactiveFormsModule, HomeComponent],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})
export class FormComponent {


  public formType = '';

  constructor(private roomService: RoomService) {

  }

  roomForm = new FormGroup({
    roomName: new FormControl(''),
    roomPwd: new FormControl(''),
  });


  formButton(): void {
    if (this.formType == 'Create') {
      this.createRoom();
    } else if (this.formType == 'Join') {
      this.joinRoom();
      console.log("Entra a JoinRoom");
    }

  }


  createRoom(): void {
    this.roomService.createRoom(
      this.roomForm.value.roomName ?? '',
      this.roomForm.value.roomPwd ?? '',
    );}


  joinRoom(): void {
    this.roomService.joinRoom(
      this.roomForm.value.roomName ?? '',
      this.roomForm.value.roomPwd ?? '',
    );}


}
