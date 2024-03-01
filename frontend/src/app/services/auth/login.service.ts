import { Injectable } from '@angular/core';
import { LoginRequest } from './loginRequest';
import { Observable, catchError, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { User } from './user';

@Injectable({
  providedIn: 'root',
 
})

export class LoginService {

  constructor(private http:HttpClient) { }

  login(credentials:LoginRequest):Observable<User>{
      return this.http.get<User>('././assessts/data.json').pipe(
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
