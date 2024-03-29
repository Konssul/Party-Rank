import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { LoginRequest } from '../../services/auth/loginRequest';
import { error } from 'console';
import { Router } from '@angular/router';
import { Subject, Subscription, catchError, finalize, takeUntil, tap, throwError } from 'rxjs';
import { User } from '../../services/auth/user';


/*Debería refactorizar para juntar el login y el register...*/
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit, OnDestroy, AfterViewInit {

  loginError: string = "";
  public formType = '';

  authServiceisLogged$: Subscription | undefined;  //Suscripcion que comprueba si el usuario está logeado
  userLoginOn?: boolean;

  authServiceLogin$: Subscription | undefined; //Suscripcion que maneja el login y la llamada a la api

  getUser$: Subscription | undefined; //Suscripcion que recoge los datos del usuario logeado
  userLoginData?: User;



  constructor(private authService: AuthService, private router: Router) {


  }

  /*Debería navegar al usuario que inicia sesión*/
  ngAfterViewInit(): void {
    if (this.userLoginOn) {
      console.log("this.userLoginOn")
      this.getUser$ = this.authService.getUserInfo().subscribe(
        (user) => {
          this.userLoginData = user
          if (this.userLoginData?.username) {
            console.log("User Comparisson")
            console.log(this.userLoginData?.username)
            console.log("----")
          }
          this.router.navigate(['profile', this.userLoginData?.username]);
        },
        (error) => {
          console.error('Error al obtener información del usuario:', error);
        }
      );
    }
  }
  ngOnDestroy(): void {


    if (this.getUser$ != null) { this.getUser$.unsubscribe() }

    if (this.authServiceisLogged$ != null) { this.authServiceisLogged$.unsubscribe() }
    if (this.authServiceLogin$ != null) { this.authServiceLogin$.unsubscribe() }
  }


  ngOnInit(): void {



    this.authServiceisLogged$ = this.authService.currentUserLoginOn$.subscribe(
      {
        next: (userLoginOn) => {
          this.userLoginOn = userLoginOn
          console.log(userLoginOn)
        }

      })
  }

  loginForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  loginButton() {
    if (this.loginForm.valid) {
      console.log('username: ' + this.loginForm.value.username)
      console.log('password: ' + this.loginForm.value.password)

      this.authServiceLogin$ = this.authService.login(this.loginForm.value as LoginRequest).subscribe({
        next: (userData) => {
          console.log(userData)
        },
        error: (errorData) => {
          console.log(errorData)
          this.loginError = errorData

        },
        complete: () => {
          console.info("Login done")


          this.getUser$ = this.authService.getUserInfo().subscribe(
            (user) => {
              this.userLoginData = user
              if (this.userLoginData?.username) {
                console.log("User Comparisson")
                console.log(this.userLoginData?.username)
                console.log("----")
              }
              this.router.navigate(['profile', this.userLoginData?.username]);
            },
            (error) => {
              console.error('Error al obtener información del usuario:', error);
            }
          );



        }
      })
      this.loginForm.reset();
    }
    else {
      this.loginForm.markAllAsTouched();
    }
  }

  get username() {
    return this.loginForm.controls.username
  }


  get password() {
    return this.loginForm.controls.password
  }

}