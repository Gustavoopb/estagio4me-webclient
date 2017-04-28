import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs';

import { ExtendedHttp } from './extended-http.service';
import { AbstractService } from "./abstract/abstract.service";

@Injectable()
export class LoginService extends AbstractService {

  constructor(public extendedHttp: ExtendedHttp) {
    super('/api/login')
  }

  public storeLogin(user: Object, authToken: string) {
    localStorage.setItem('user', JSON.stringify(user))
    localStorage.setItem('auth_token', authToken)
  }

  public login(user: any) {
    return this.extendedHttp.post(this.getURL("/login"), user)
  }

  public logout() {
    localStorage.removeItem('auth_token')
    localStorage.removeItem('user')
  }

  public loggedIn() {
    return localStorage.getItem('auth_token') != null
  }

  public isAdmin() {
    return this.loggedIn() ? JSON.parse(localStorage.getItem('user')).isAdmin : false
  }
}
