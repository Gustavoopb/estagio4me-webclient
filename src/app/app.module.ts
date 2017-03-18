import { BrowserModule } from '@angular/platform-browser'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { HttpModule, XHRBackend, RequestOptions } from '@angular/http'
import { MaterialModule } from '@angular/material'
import { NgModule } from '@angular/core'
import { Router } from '@angular/router'

import { AppComponent } from './app.component'
import { HomeComponent } from './component/home/home.component'
import { LoginFormComponent } from './component/login-form/login-form.component'
import { RegisterFormComponent } from './component/register-form/register-form.component'

import { routing } from './routing/app.routing'

import { CanActivateViaAuthGuardService } from './service/can-activate-via-auth-guard.service'
import { ExtendedHttp } from './service/extended-http.service'
import { LoginService } from './service/login.service'
import { RegisterService } from './service/register.service'

@NgModule({
  declarations: [
    AppComponent,
    LoginFormComponent,
    HomeComponent,
    RegisterFormComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    MaterialModule,
    routing
  ],
  providers: [
    {
      provide: ExtendedHttp,
      useFactory: ExtendedHttp.providers,
      deps: [XHRBackend, RequestOptions, Router]
    },
    RegisterService,
    LoginService,

    CanActivateViaAuthGuardService
  ], bootstrap: [AppComponent]
})
export class AppModule { }
