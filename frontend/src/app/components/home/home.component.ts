import { Component, OnInit } from '@angular/core';
import { RoomService } from '../../services/room.service';
import { RouterModule } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { FormComponent } from '../form/form.component';

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

  constructor(private modalService: MatDialog, router: RouterModule) {

  }

  
  openCreateRoomForm(): void {
    this.modalService.open(FormComponent,{ width: '200px', closeOnNavigation: true, hasBackdrop:true, backdropClass:'backdropclass', position: {left:'42%'}} );
    console.log("AbriendoFormulario")
  }    

  
}
