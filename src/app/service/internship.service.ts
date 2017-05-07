import { Response } from '@angular/http'
import { Injectable } from '@angular/core'
import { ExtendedHttp } from "./extended-http.service"
import { Observable } from "rxjs"
import { AbstractService } from "./abstract/abstract.service"
import { InternshipModel } from "../model/internship.model";

@Injectable()
export class InternshipService extends AbstractService {

  constructor(public extendedHttp: ExtendedHttp) {
    super('/api/internship')
  }

  public insert(internship: InternshipModel): Observable<Response> {
    return this.extendedHttp.post(this.getURL(['/insert']), internship)
  }

  public findAll(): Observable<Response> {
    return this.extendedHttp.get(this.getURL(['/findAll']))
  }

  public findByFilter(filter: Object): Observable<Response> {
    return this.extendedHttp.post(this.getURL(['/findByFilter']), filter)
  }

  public findOneByFilter(filter: Object): Observable<Response> {
    return this.extendedHttp.post(this.getURL(['/findOneByFilter']), filter)
  }

  public update(body: Object): Observable<Response> {
    return this.extendedHttp.post(this.getURL(['/updateOne']), body)
  }

  public delete(internship: InternshipModel): Observable<Response> {
    return this.extendedHttp.delete(this.getURL(['/delete', internship.id]))
  }
}
