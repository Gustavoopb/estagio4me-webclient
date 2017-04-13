import { Injectable } from '@angular/core'
import { Router } from '@angular/router';
import { Http, XHRBackend, RequestOptions, Request, RequestOptionsArgs, Response, Headers } from '@angular/http'
import { Observable } from 'rxjs/Observable'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch'

@Injectable()
export class ExtendedHttp extends Http {

  public router: Router

  constructor(backend: XHRBackend, options: RequestOptions, router: Router) {
    super(backend, options)
    this.router = router
  }

  request(url: string | Request, options?: RequestOptionsArgs): Observable<Response> {
    let token = sessionStorage.getItem('auth_token')
    if (typeof url === 'string') {
      if (!options) {
        options = { headers: new Headers() }
      }
      if (token != "null") {
        options.headers.set('Authorization', `JWT ${token}`)
      }
      options.headers.set('Content-Type', 'application/json')
    } else {
      if (token != "null") {
        url.headers.append('Authorization', `JWT ${token}`)
      }
      url.headers.append('Content-Type', 'application/json')

    }
    return super.request(url, options).catch(this.catchAuthError(this))
  }

  private catchAuthError(self: ExtendedHttp) {
    return (res: Response) => {
      if (res.status === 401 || res.status === 403) {
        if (res.status === 401) {
          this.router.navigate(['', 'register'])
          console.log(res.text())
        }
        console.log(res)
      }
      return Observable.throw(res)
    }

  }


  static providers(backend: XHRBackend, options: RequestOptions, router: Router) {
    return new ExtendedHttp(backend, options, router)
  }

}

