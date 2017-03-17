import { Injectable } from '@angular/core';
import { Http, XHRBackend, RequestOptions, Request, RequestOptionsArgs, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class AuthService extends Http {

  constructor(backend: XHRBackend, options: RequestOptions) {
    let token = sessionStorage.getItem('auth_token');
    options.headers.set('Authorization', `JWT ${token}`);
    options.headers.set('Content-Type', 'application/json')
    super(backend, options);
  }

  request(url: string | Request, options?: RequestOptionsArgs): Observable<Response> {
    let token = localStorage.getItem('auth_token');
    if (typeof url === 'string') {
      if (!options) {
        options = { headers: new Headers() };
      }
      options.headers.set('Authorization', `JWT ${token}`)
      options.headers.set('Content-Type', 'application/json')
    } else {
      url.headers.set('Authorization', `JWT ${token}`)
      url.headers.set('Content-Type', 'application/json')
    }
    return super.request(url, options).catch(this.catchAuthError(this));
  }

  private catchAuthError(self: AuthService) {
    return (res: Response) => {
      console.log(res);
      if (res.status === 401 || res.status === 403) {
        console.log(res);
      }
      return Observable.throw(res);
    };
  }


  static providers(backend: XHRBackend, options: RequestOptions) {
    return new AuthService(backend, options);
  }

}

