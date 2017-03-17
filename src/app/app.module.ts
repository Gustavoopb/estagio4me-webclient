import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule, XHRBackend, RequestOptions, Http } from '@angular/http';
import { MaterialModule } from '@angular/material';
import { AppComponent } from './app.component';
import { LoginFormComponent } from './component/login-form/login-form.component';
import { routing } from './routing/app.routing';
import { HomeComponent } from './component/home/home.component';
import { RegisterFormComponent } from './component/register-form/register-form.component'
import { RegisterService } from './service/register.service';
import { AuthService } from './service/auth.service';
import { LoginService } from './service/login.service';

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
      provide: AuthService,
      useFactory: AuthService.providers,
      deps: [XHRBackend, RequestOptions]
    },
    RegisterService,
    LoginService
  ], bootstrap: [AppComponent]
})
export class AppModule { }
