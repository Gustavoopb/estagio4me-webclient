import { Response } from '@angular/http'
import { Injectable } from '@angular/core'
import { ExtendedHttp } from "./extended-http.service"
import { Observable } from "rxjs"
import { AbstractService } from "./abstract/abstract.service"

@Injectable()
export class InternshipService extends AbstractService{

  constructor(public extendedHttp: ExtendedHttp) {
    super('/api/internship')
   }

  public insert(internship: any): Observable<Response> {
    return this.extendedHttp.post(this.getURL('/insert'), internship)
  }

  public findAll(): Observable<Response> {
    return this.extendedHttp.get(this.getURL('/findAll'))
  }

}
