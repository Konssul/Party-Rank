import { Injectable } from '@angular/core';
import { LoginRequest } from './loginRequest';
import { Observable, catchError, throwError, BehaviorSubject, tap, map } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { User } from './user';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';
import { RegisterRequest } from './registerRequest';

@Injectable({
  providedIn: 'root',
 
})

export class AuthService {

  currentUserLoginOnSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(sessionStorage.getItem("token")!=null);
  currentUserLoginOn$:Observable<boolean> = this.currentUserLoginOnSubject.asObservable();

  currentLoginUserDataSubject: BehaviorSubject<String> = new BehaviorSubject<String>(sessionStorage.getItem("token") || "");
  currentLoginUserData$:Observable<String> = this.currentLoginUserDataSubject.asObservable();

  

  constructor(private http:HttpClient, private router:Router) { 
    
    //this.currentUserLoginOnSubject=new BehaviorSubject<boolean>(sessionStorage.getItem("token")!=null);
    //this.currentLoginUserDataSubject=new BehaviorSubject<String>(sessionStorage.getItem("token") || "");

  }

  login(credentials:LoginRequest):Observable<any>{
      return this.http.post<any>(environment.urlHost+"auth/login", credentials).pipe(

        tap((userData)=>{
          sessionStorage.setItem("token", userData.token)
          this.currentLoginUserDataSubject.next(userData.token);
          this.currentUserLoginOnSubject.next(true)
          console.log(this.currentUserLoginOnSubject.value)
          
        }),
        map((userData)=>userData.token),
        catchError(this.handleError)
      )
  }

  register(credentials:RegisterRequest):Observable<any>{
    return this.http.post<any>(environment.urlHost+"auth/register", credentials).pipe(

      tap((userData)=>{
        sessionStorage.setItem("token", userData.token)
        this.currentLoginUserDataSubject.next(userData.token);
        this.currentUserLoginOnSubject.next(true)
        console.log(this.currentUserLoginOnSubject.value)
        
      }),
      map((userData)=>userData.token),
      catchError(this.handleError)
    )
}


  private handleError(error:HttpErrorResponse){
    if(error.status===0){
      console.error('Se ha producido un error', error.error)
    }
    else{
      console.error('El Backend retornó el código de estado', error)
    }
    return throwError(()=>new Error('Please, try again'))

  }  

  logout():void{
    console.log("Logout")
    sessionStorage.removeItem("token");
    this.currentUserLoginOnSubject.next(false);
    this.router.navigate(['login'])
  }

  get userToken():String{
    return this.currentLoginUserDataSubject.value
  }
  getUserInfo(): Observable<User> {
    const token = this.currentLoginUserDataSubject.value;

    if (!token) {
      return throwError("No hay token disponible");
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<User>(environment.urlHost + "auth/user", { headers }).pipe(
      catchError(this.handleError)
    );
  }
  
}

