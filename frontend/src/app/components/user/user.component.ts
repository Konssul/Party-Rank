import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [RouterModule],
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
