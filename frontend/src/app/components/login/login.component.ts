import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoginService } from '../../services/auth/login.service';
import { LoginRequest } from '../../services/auth/loginRequest';
import { error } from 'console';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit, OnDestroy, AfterViewInit{

  userLoginOn?:boolean;
  loginError:string = "";
  public formType = '';

  constructor(private loginService: LoginService, private router:Router) {


  }
  ngAfterViewInit(): void {
    if(this.userLoginOn){
      console.log("this.userLoginOn")
      this.router.navigate(['profile'])
    }
  }
  ngOnDestroy(): void {
    //Unsubscribe if something goes wrong.
    }


  ngOnInit(): void {
    

    
    this.loginService.currentUserLoginOn$.subscribe(
      {
        next:(userLoginOn)=>{
          this.userLoginOn=userLoginOn
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
    
      this.loginService.login(this.loginForm.value as LoginRequest).subscribe({
        next: (userData) => {
          console.log(userData)
        },
        error:(errorData)=>{
          console.log(errorData)
          this.loginError = errorData

        },
        complete:()=>{
          console.info("Login done")
          this.router.navigate(['profile']);
        }
      })
      this.loginForm.reset();
    }
    else{
      this.loginForm.markAllAsTouched();
    }
  }

  username(){
    return this.loginForm.controls.username
  }
  
  
  password(){
    return this.loginForm.controls.password
  }

}
