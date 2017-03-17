import { Injector, Inject, ReflectiveInjector, } from '@angular/core'
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs/Rx';
import 'rxjs/Rx';
import { RegisterService } from '../service/register.service';
import {
    BaseRequestOptions,
    BaseResponseOptions,
    BrowserXhr,
    ConnectionBackend,
    CookieXSRFStrategy,
    Http,
    RequestOptions,
    ResponseOptions,
    XHRBackend,
    XSRFStrategy
} from '@angular/http';

interface IUsernameEmailValidator {
}


function checkRegister(control: FormControl, source: string): Observable<IUsernameEmailValidator> {
    var injector: Injector = ReflectiveInjector.resolveAndCreate([
        RegisterService, Http, BrowserXhr,
        { provide: RequestOptions, useClass: BaseRequestOptions },
        { provide: ResponseOptions, useClass: BaseResponseOptions },
        { provide: ConnectionBackend, useClass: XHRBackend },
        { provide: XSRFStrategy, useFactory: () => new CookieXSRFStrategy() }
    ])

    var registerService: RegisterService = injector.get(RegisterService)

    return new Observable((obs: any) => {

        control
            .valueChanges
            .debounceTime(400)
            .flatMap(value => registerService.checkEmailUsername({ [source]: value }))
            .subscribe(
            res => {
                let reason;
                console.log(res.text(), "~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~", res.text() != "null")
                if (res.text() != "null") {
                    reason = source + "Taken"
                    obs.next({ [reason]: true });
                    obs.complete();
                } else {
                    obs.next(null);
                    obs.complete();
                }
            },
            error => {
                console.log(registerService, "\n<-----------------------------\n", error)
                let message = error.message
                obs.next(null);
                obs.complete();
            }
            );
    });
}


export class RegisterlValidator {

    constructor() {
    }

    static checkUsername(control: FormControl) {
        return checkRegister(control, 'username');
    }

    static checkEmail(control: FormControl) {
        return checkRegister(control, 'email');
    }

}