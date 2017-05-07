import { Response } from '@angular/http';
import { Injectable } from '@angular/core';
import { ExtendedHttp } from "./extended-http.service";
import { Observable } from "rxjs";
import { AbstractService } from "./abstract/abstract.service";
import { RatingModel } from "../model/rating.model";

@Injectable()
export class RatingService extends AbstractService {

  constructor(public extendedHttp: ExtendedHttp) {
    super('/api/rating')
  }

  public save(rating: RatingModel): Observable<Response> {
    return this.extendedHttp.post(this.getURL(["/save"]), rating)
  }

  public findOne(rating: RatingModel): Observable<Response> {
    return this.extendedHttp.post(this.getURL(["/findOne"]), rating)
  }

  public findByAuthUser(): Observable<Response> {
    return this.extendedHttp.get(this.getURL(["/findByAuthUser"]))
  }

  public delete(rating: RatingModel) {
    return this.extendedHttp.delete(this.getURL(["/delete", rating.user.id, rating.internship.id]))
  }
}