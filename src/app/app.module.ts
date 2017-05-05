import { BrowserModule } from '@angular/platform-browser'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { HttpModule, XHRBackend, RequestOptions } from '@angular/http'
import { MaterialModule, MdDialogRef } from '@angular/material'
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
import { InternshipFormComponent } from './component/internship-form/internship-form.component'
import { InternshipService } from "./service/internship.service"
import { SkillService } from "./service/skill.service"
import { CurrencyMaskModule } from "ng2-currency-mask"
import { CanActivateAdminComponentService } from "./service/can-activate-admin-component.service";
import { SidenavMenuComponent } from './component/sidenav-menu/sidenav-menu.component';
import { InternshipDetailComponent } from './component/internship-detail/internship-detail.component';
import { InternshipAdminButtonsComponent } from './component/internship-admin-buttons/internship-admin-buttons.component';
import { InternshipModel } from "./model/internship.model";
import { UserModel } from "./model/user.model";
import { SkillModel } from "./model/skill.model";
import { AbstractModel } from "./model/abstract/abstract.model";
import { ConfirmDialogComponent } from './component/confirm-dialog/confirm-dialog.component';
import { AboutComponent } from './component/about/about.component';

@NgModule({
  declarations: [
    AppComponent,
    ConfirmDialogComponent,
    HomeComponent,
    InternshipAdminButtonsComponent,
    InternshipDetailComponent,
    InternshipFormComponent,
    LoginFormComponent,
    RegisterFormComponent,
    SidenavMenuComponent,
    AboutComponent
  ],
  imports: [
    CurrencyMaskModule,
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

    InternshipService,
    LoginService,
    RegisterService,
    SkillService,

    CanActivateAdminComponentService,
    CanActivateViaAuthGuardService
  ],
  entryComponents: [ConfirmDialogComponent]
  , bootstrap: [AppComponent]
})
export class AppModule { }
