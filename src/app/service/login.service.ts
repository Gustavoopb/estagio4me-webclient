import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs';

import { ExtendedHttp } from './extended-http.service';
import { AbstractService } from "./abstract/abstract.service";
import { UserModel } from "../model/user.model";

@Injectable()
export class LoginService extends AbstractService {

  constructor(public extendedHttp: ExtendedHttp) {
    super('/api/login')
  }

  public storeLogin(user: UserModel, authToken: string): void {
    localStorage.setItem('user', JSON.stringify(user))
    localStorage.setItem('auth_token', authToken)
  }

  public login(user: any): Observable<Response> {
    return this.extendedHttp.post(this.getURL("/login"), user)
  }

  public reAuth(): Observable<Response> {
    return this.extendedHttp.get(this.getURL("/reAuth"))
  }

  public logout(): void {
    localStorage.removeItem('auth_token')
    localStorage.removeItem('user')
  }

  public isLoggedIn(): boolean {
    return localStorage.getItem('auth_token') != null
  }

  public isAdmin(): boolean {
    return this.isLoggedIn() ? this.loggedUser().isAdmin : false
  }

  public loggedUser(): UserModel {
    return new UserModel(JSON.parse(localStorage.getItem('user')))
  }
}
