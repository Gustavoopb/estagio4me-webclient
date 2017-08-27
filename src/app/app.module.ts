import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { HttpModule, RequestOptions, XHRBackend } from '@angular/http'

import { AboutComponent } from './component/about/about.component'
import { AppComponent } from './app.component'
import { AutocompleteComponent } from './component/autocomplete/autocomplete.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { BrowserModule } from '@angular/platform-browser'
import { CanActivateAdminComponentService } from './service/can-activate/can-activate-admin-component.service'
import { CanActivateUnloggedService } from './service/can-activate/can-activate-unlogged.service'
import { CanActivateViaAuthGuardService } from './service/can-activate/can-activate-via-auth-guard.service'
import { ConfirmDialogComponent } from './component/confirm-dialog/confirm-dialog.component'
import { CurrencyMaskModule } from 'ng2-currency-mask'
import { ExtendedHttp } from './service/extended-http.service'
import { HomeComponent } from './component/home/home.component'
import { InternshipAdminButtonsComponent } from './component/internship-admin-buttons/internship-admin-buttons.component'
import { InternshipDetailComponent } from './component/internship-detail/internship-detail.component'
import { InternshipFormComponent } from './component/internship-form/internship-form.component'
import { InternshipListItemComponent } from './component/internship-list-item/internship-list-item.component'
import { InternshipService } from './service/internship.service'
import { LoginFormComponent } from './component/login-form/login-form.component'
import { LoginService } from './service/login.service'
import { MaterialModule } from '@angular/material'
import { ProfileFormComponent } from './component/profile-form/profile-form.component'
import { ProfileService } from "./service/profile.service";
import { RatingComponent } from './component/rating/rating.component'
import { RatingService } from './service/rating.service'
import { RegisterFormComponent } from './component/register-form/register-form.component'
import { RegisterService } from './service/register.service'
import { RoutedComponentComponent } from './component/routed-component/routed-component.component';
import { Router } from '@angular/router'
import { SidenavMenuComponent } from './component/sidenav-menu/sidenav-menu.component'
import { SkillService } from './service/skill.service'
import { StarsComponent } from './component/stars/stars.component'
import { WebsocketService } from "./service/websocket.service";
import { routing } from './routing/app.routing';

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
    AboutComponent,
    StarsComponent,
    InternshipListItemComponent,
    RatingComponent,
    ProfileFormComponent,
    AutocompleteComponent,
    RoutedComponentComponent
  ],
  imports: [
    CurrencyMaskModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    MaterialModule,
    BrowserAnimationsModule,
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
    RatingService,
    RegisterService,
    SkillService,
    ProfileService,
    WebsocketService,

    CanActivateAdminComponentService,
    CanActivateViaAuthGuardService,
    CanActivateUnloggedService
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  entryComponents: [ConfirmDialogComponent]
  , bootstrap: [AppComponent]
})
export class AppModule { }
