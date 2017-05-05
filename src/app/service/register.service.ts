import { Injectable } from '@angular/core'
import { Response } from '@angular/http'
import { Observable } from 'rxjs'
import { ExtendedHttp } from './extended-http.service'
import { AbstractService } from "./abstract/abstract.service";
import { UserModel } from "../model/user.model";


@Injectable()
export class RegisterService extends AbstractService {

  constructor(public extendedHttp: ExtendedHttp) {
    super('/api/login')
  }

  public regiterUser(user: UserModel): Observable<Response> {
    var newUser = {
      password: user.password,
      user: user
    }
    return this.extendedHttp.post(this.getURL("/singUp"), newUser)
  }

  public checkEmailUsername(condition: any): Observable<Response> {
    return this.extendedHttp.post(this.getURL("/checkEmailUsername"), condition)
  }

}
