import { Injectable } from '@angular/core';

@Injectable()
export class CanActivateAdminComponentService {

  constructor() { }

  canActivate() {
    var user = JSON.parse(localStorage.getItem('user'))
    return user["isAdmin"];
  }
}
