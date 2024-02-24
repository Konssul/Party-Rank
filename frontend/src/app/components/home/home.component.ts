import { Component, OnInit } from '@angular/core';
import { RoomService } from '../../services/room.service';
import { RouterModule } from '@angular/router';
import { ModalService } from '../../services/modal.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  roomName = "AXBC";
  roomPwd = "12345"

  constructor(private modalService: ModalService) {

  }
  
  openCreateRoomForm(): void {
    this.modalService.openFormModal();
    console.log("AbriendoFormulario")

  }
  
}
