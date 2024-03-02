import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { LoginRequest } from '../../services/auth/loginRequest';
import { error } from 'console';
import { Router } from '@angular/router';
import { Subject, Subscription, catchError, finalize, takeUntil, tap, throwError } from 'rxjs';
import { User } from '../../services/auth/user';
import { RegisterRequest } from '../../services/auth/registerRequest';


/*Debería refactorizar para juntar el login y el register...*/
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit, OnDestroy, AfterViewInit {

  registerError: string = "";
  public formType = '';

  authServiceisLogged$: Subscription | undefined; //Suscripcion que comprueba si el usuario está logeado
  userLoginOn?: boolean;

  authServiceRegister$: Subscription | undefined; //Suscripcion que maneja el registro y la llamada a la api

  getUserSubscription$: Subscription | undefined; //Suscripcion que recoge los datos del usuario registrado
  userLoginData?: User;

  constructor(private authService: AuthService, private router: Router) {


  }

  /*Debería navegar al usuario que inicia sesión*/
  ngAfterViewInit(): void {
    if (this.userLoginOn) {
      console.log("this.userLoginOn")
      this.getUserSubscription$ = this.authService.getUserInfo().subscribe(
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


    if (this.getUserSubscription$ != null) { this.getUserSubscription$.unsubscribe() }
    if (this.authServiceisLogged$ != null) { this.authServiceisLogged$.unsubscribe() }
    if (this.authServiceRegister$ != null) { this.authServiceRegister$.unsubscribe() }
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

  registerForm = new FormGroup({
    username: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
  });

  registerButton() {
    if (this.registerForm.valid) {
      console.log('username: ' + this.registerForm.value.username)
      console.log('email: ' + this.registerForm.value.email)
      console.log('password: ' + this.registerForm.value.password)

      //Cambiar por authService.register
      this.authServiceRegister$ = this.authService.register(this.registerForm.value as RegisterRequest).subscribe({
        next: (userData) => {
          console.log(userData)
        },
        error: (errorData) => {
          console.log(errorData)
          this.registerError = errorData

        },
        complete: () => {
          console.info("Login done")


          this.getUserSubscription$ = this.authService.getUserInfo().subscribe(
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
      this.registerForm.reset();
    }
    else {
      this.registerForm.markAllAsTouched();
    }
  }

  get username() {
    return this.registerForm.controls.username
  }

  get email() {
    return this.registerForm.controls.email
  }
  get password() {
    return this.registerForm.controls.password
  }

}