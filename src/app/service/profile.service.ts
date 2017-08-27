import { AbstractService } from "./abstract/abstract.service"
import { ExtendedHttp } from "./extended-http.service"
import { Injectable } from '@angular/core'
import { Observable } from "rxjs/Observable";
import { ProfileModel } from "../model/profile.model";
import { Response } from '@angular/http';

@Injectable()
export class ProfileService extends AbstractService {

  constructor(public extendedHttp: ExtendedHttp) {
    super('/api/profile')
  }

  public findOne(): Observable<Response> {
    return this.extendedHttp.get(super.getURL(['/findOne']))
  }

  public save(profile: ProfileModel): Observable<Response> {
    return this.extendedHttp.post(super.getURL(['/save']), profile)
  }
}
