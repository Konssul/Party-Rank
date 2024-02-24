import { Component, OnInit } from '@angular/core';
import { RoomService } from '../../services/room.service';
import { NavigationStart, Router,Event as RouterEvent } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { FormComponent } from '../form/form.component';
import { filter } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  routerSubscription:any;
  dialogRef:any;

  roomName = "AXBC";
  roomPwd = "12345"

  constructor(private dialog: MatDialog, private router: Router) {
  }
  
  openCreateRoomForm(): void {
    this.dialogRef = this.dialog.open(FormComponent,{ width: '200px', closeOnNavigation: true, hasBackdrop:true, backdropClass:'backdropclass', position: {left:'42%'}} );
    this.dialogRef.componentInstance.formType = 'Create';

  }    
  openJoinRoomForm(): void {
    this.dialogRef = this.dialog.open(FormComponent,{ width: '200px', closeOnNavigation: true, hasBackdrop:true, backdropClass:'backdropclass', position: {left:'42%'}} );
    this.dialogRef.componentInstance.formType = 'Join';

  }  


  //Cierra el Formulario cuando hay un cambio en el router.
  ngOnInit() {
    this.routerSubscription = this.router.events
      .pipe(
        filter((event: Event | RouterEvent): event is NavigationStart => event instanceof NavigationStart),
        filter(() => !!this.dialogRef)
      )
      .subscribe(() => {
        this.dialogRef.close();
      });
  }

  
}
