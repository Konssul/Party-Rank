import { Component, ElementRef, EventEmitter, Output, ViewChild, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RoomComponent } from '../room/room.component';
import { HomeComponent } from '../home/home.component';
import { RoomService } from '../../services/room.service';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [ReactiveFormsModule, HomeComponent],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})
export class FormComponent {
  @ViewChild('formContainer') formContainer!: ElementRef;


  constructor( private roomService: RoomService) {

  }

  roomForm = new FormGroup({
    roomName: new FormControl(''),
    roomPwd: new FormControl(''),
  });
  
  
  createRoom(): void {
    this.roomService.createRoom(
      this.roomForm.value.roomName ?? '',
      this.roomForm.value.roomName ?? '',
    );


  }


}
