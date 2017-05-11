import { CanActivate } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from "rxjs/Observable";

import { LoginService } from '../login.service';


@Injectable()
export class CanActivateUnloggedService implements CanActivate {


  canActivate(): boolean | Observable<boolean> | Promise<boolean> {
    return !this.loginService.isLoggedIn()
  }

  constructor(public loginService: LoginService) { }

}
