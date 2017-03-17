import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs';

import { AuthService } from './auth.service';

@Injectable()
export class RegisterService {
  url: string = 'http://localhost:3000/api/login';
  constructor(public authService: AuthService) {
    
  }

  public regiterUser(user: any): Observable<Response> {
    var newUser = {
      "password": user.password,
      "user": {
        "email": user.email,
        "firstName": user.firstName,
        "secondName": user.secondName,
        "username": user.username
      }
    }

    return this.authService.post(this.url + "/singUp", newUser)
  }

  public checkEmailUsername(condition: any): Observable<Response> {
    console.log(this.authService)
    return this.authService.post(this.url + "/checkEmailUsername", condition)
  }

}
