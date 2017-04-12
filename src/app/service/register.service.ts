import { Injectable } from '@angular/core'
import { Response } from '@angular/http'
import { Observable } from 'rxjs'
import { ExtendedHttp } from './extended-http.service'
import { AbstractService } from "./abstract/abstract.service";


@Injectable()
export class RegisterService extends AbstractService {

  constructor(public extendedHttp: ExtendedHttp) {
    super('/api/login')
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
    console.log(JSON.stringify(newUser))
    return this.extendedHttp.post(this.getURL("/singUp"), newUser)
  }

  public checkEmailUsername(condition: any): Observable<Response> {
    return this.extendedHttp.post(this.getURL("/checkEmailUsername"), condition)
  }

}
