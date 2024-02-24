import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { RoomService } from './room.service';

@Injectable({
  providedIn: 'root'
})
export class ConnectionGuard implements CanActivate {

  constructor(private roomService: RoomService, private router: Router) {}

  canActivate(): boolean {
    if (this.roomService.IsConnected()) {
      return true;
    } else {
      this.router.navigate(['/']);
      return false;
    }
  }
}
