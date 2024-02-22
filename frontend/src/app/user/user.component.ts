import { Component } from '@angular/core';
import { GamesComponent } from '../games/games.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [GamesComponent, RouterModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {
  username = 'konsul';
  isLoggedIn = false;
  favGame = '';
  getFavourite (gameName: string)
  {
    this.favGame = gameName;
  }

  greet(){
    alert('Hola')
  };
}
