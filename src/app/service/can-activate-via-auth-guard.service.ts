import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';

import { LoginService } from './login.service';

@Injectable()
export class CanActivateViaAuthGuardService implements CanActivate {

  constructor(public loginService: LoginService) { }

  canActivate() {
    return this.loginService.loggedIn();
  }

}
