import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs';

import { ExtendedHttp } from './extended-http.service';

@Injectable()
export class LoginService {
  url: string = 'http://localhost:3000/api/login'
  constructor(public extendedHttp: ExtendedHttp) {

  }

  public login(user: any) {
    return this.extendedHttp.post(this.url + "/login", user)
  }

  public logout() {
    sessionStorage.removeItem('auth_token')
    sessionStorage.removeItem('user')
  }

  public loggedIn() {
    return sessionStorage.getItem('auth_token') != null
  }
}
