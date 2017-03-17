import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs';

import { AuthService } from './auth.service';

@Injectable()
export class LoginService {
  url: string = 'http://localhost:3000/api/login'
  constructor(public authService: AuthService) {

  }

  public login(user: any){
    return this.authService.post(this.url+"/login", user)
  }

  public logout(){
    sessionStorage.removeItem('auth_token')
  }

  public loggedIn(){
    return sessionStorage.getItem('auth_token') != null
  }
 }
