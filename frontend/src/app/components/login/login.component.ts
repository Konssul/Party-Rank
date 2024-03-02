import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoginService } from '../../services/auth/login.service';
import { LoginRequest } from '../../services/auth/loginRequest';
import { error } from 'console';
import { Router } from '@angular/router';
import { Subject, Subscription, catchError, finalize, takeUntil, tap } from 'rxjs';
import { User } from '../../services/auth/user';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit, OnDestroy, AfterViewInit {

  private destroy$ = new Subject<void>();

  userLoginData?: User;
  userLoginOn?: boolean;
  loginError: string = '';
  loginForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  constructor(private loginService: LoginService, private router: Router) {}

  ngOnInit(): void {
    this.loginService.currentUserLoginOn$
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (userLoginOn) => {
          this.userLoginOn = userLoginOn;
          console.log(userLoginOn);
        }
      });
  }

  ngAfterViewInit(): void {
    if (this.userLoginOn) {
      this.loginService.getUserInfo()
        .pipe(takeUntil(this.destroy$))
        .subscribe(
          (user) => this.handleUserInfo(user),
          (error) => console.error('Error al obtener información del usuario:', error)
        );
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private handleUserInfo(user: User): void {
    this.userLoginData = user;
    if (this.userLoginData?.username) {
      console.log('User Comparison');
      console.log(this.userLoginData?.username);
      console.log('----');
    }
    this.router.navigate(['profile', this.userLoginData?.username]);
  }

  loginButton() {
    if (this.loginForm.valid) {
      const loginRequest = this.loginForm.value as LoginRequest;

      this.loginService.login(loginRequest)
        .pipe(
          takeUntil(this.destroy$),
          tap((userData) => console.log(userData)),
          catchError((errorData) => {
            console.log(errorData);
            this.loginError = errorData;
            throw errorData; // rethrowing to propagate the error
          }),
          finalize(() => {
            console.info('Login done');
            this.getUserInfoAfterLogin();
            this.loginForm.reset();
          })
        )
        .subscribe();
    } else {
      this.loginForm.markAllAsTouched();
    }
  }

  private getUserInfoAfterLogin(): void {
    this.loginService.getUserInfo()
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (user) => this.handleUserInfo(user),
        (error) => console.error('Error al obtener información del usuario:', error)
      );
  }

  get username() {
    return this.loginForm.controls.username;
  }

  get password() {
    return this.loginForm.controls.password;
  }
}
