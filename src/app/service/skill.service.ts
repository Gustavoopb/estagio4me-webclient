import { Response } from '@angular/http';
import { Injectable } from '@angular/core';
import { ExtendedHttp } from "./extended-http.service";
import { Observable } from "rxjs";

@Injectable()
export class SkillService {
  url: string = 'https://estagio4me-server.herokuapp.com/api/skill'
  constructor(public extendedHttp: ExtendedHttp) {

  }

  public findAll(): Observable<Response> {
    return this.extendedHttp.get(this.url + '/findAll')
  }

  
}
