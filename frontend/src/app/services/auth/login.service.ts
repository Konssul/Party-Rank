import { Injectable } from '@angular/core';
import { LoginRequest } from './loginRequest';
import { Observable, catchError, throwError, BehaviorSubject, tap } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { User } from './user';

@Injectable({
  providedIn: 'root',
 
})

export class LoginService {

  currentUserLoginOnSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  currentUserLoginOn$:Observable<boolean> = this.currentUserLoginOnSubject.asObservable();

  currentLoginUserDataSubject: BehaviorSubject<User> = new BehaviorSubject<User>({id:0, username:''}); //TODO: Session Storage...
  currentLoginUserData$:Observable<User> = this.currentLoginUserDataSubject.asObservable();


  constructor(private http:HttpClient) { }

  login(credentials:LoginRequest):Observable<User>{
      return this.http.get<User>('././assets/data.json').pipe(

        tap(userData=>{
          this.currentLoginUserDataSubject.next(userData);
          this.currentUserLoginOnSubject.next(true);
          

        }),
        catchError(this.handleError)
      )
  }


  private handleError(error:HttpErrorResponse){
    if(error.status===0){
      console.error('Se ha producido un error', error.error)
    }
    else{
      console.error('El Backend retornó el código de estado', error.status, error.error)
    }
    return throwError(()=>new Error('Please, try again'))

  }  
}

