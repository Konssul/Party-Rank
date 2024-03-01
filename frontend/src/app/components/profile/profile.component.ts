import { Component } from '@angular/core';
import { LoginService } from '../../services/auth/login.service';
import { User } from '../../services/auth/user';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  userLoginOn: boolean = false;
  loginUserData?: User;

  constructor(private loginService: LoginService) {

  }

  ngOnInit(): void {

    this.loginService.currentUserLoginOn$.subscribe(
      {
        next: (userLoginOn) => {
          this.userLoginOn = userLoginOn
        }

      })

    this.loginService.currentLoginUserData$.subscribe(
      {
        next: (loginUserData) => {
          this.loginUserData = loginUserData
        }

      })
  }
}
