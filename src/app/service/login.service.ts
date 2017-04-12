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

  public login(user: any) {
    return this.extendedHttp.post(this.getURL("/login"), user)
  }

  public logout() {
    sessionStorage.removeItem('auth_token')
    sessionStorage.removeItem('user')
  }

  public loggedIn() {
    return sessionStorage.getItem('auth_token') != null
  }
}
