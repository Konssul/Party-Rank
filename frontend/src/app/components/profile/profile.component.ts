import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { LoginService } from '../../services/auth/login.service';
import { User } from '../../services/auth/user';
import { UserService } from '../../services/user/user.service';
import { environment } from '../../../environments/environment';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit, OnDestroy {
  userLoginOn?: boolean;
  userProfileData?: User;

  userLoggedData?: User;
  userLoginOnSubscription?: Subscription;
  getUserSubscription?: Subscription;
  isUserProfileLogged: boolean = false;

  constructor(private loginService: LoginService, private userService: UserService, private router: Router, private route: ActivatedRoute) {
  }
  ngOnDestroy(): void {
    if (this.userLoginOnSubscription) {
      this.userLoginOnSubscription.unsubscribe();
    }

    if (this.getUserSubscription) {
      this.getUserSubscription.unsubscribe();
    }
  }

  ngOnInit(): void {

    /*Coge los datos del usuario que está logeado y los compara con el perfil*/

    this.userLoginOnSubscription = this.loginService.currentUserLoginOn$.subscribe(
      {
        next: (userLoginOn) => {

          this.userLoginOn = userLoginOn
          console.log("USERLOGINON" + userLoginOn)
          if (userLoginOn) {
            this.getUserSubscription = this.loginService.getUserInfo().subscribe(
              (user) => {
                this.userLoggedData = user;
                console.log("USER PROFILE:", this.userLoggedData);

                if (this.userProfileData?.username == this.userLoggedData?.username) {
                  console.log("User Comparisson")
                  console.log(this.userProfileData?.username)
                  console.log(this.userLoggedData?.username)
                  console.log("----")
                  this.isUserProfileLogged = true;
                }
              },
              (error) => {
                console.error('Error al obtener información del usuario:', error);
              }
            );
          }
        }
      })

    const userIdParam = this.route.snapshot.paramMap.get('username');
    if (userIdParam !== null) {

      this.userService.getUser(userIdParam).subscribe({
        next: (userData) => {
          this.userProfileData = userData;
        },
        error: (erroData) => {
          console.log(erroData)
        },
        complete: () => {

        }
      })
    }
  }

  logoutButton() {
    this.loginService.logout()
  }
}
