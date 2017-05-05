import {LoginService} from './login.service';
import { Injectable } from '@angular/core';

@Injectable()
export class CanActivateAdminComponentService {

  constructor(public loginService: LoginService) { }

  canActivate() {
    return this.loginService.isAdmin()
  }
}
