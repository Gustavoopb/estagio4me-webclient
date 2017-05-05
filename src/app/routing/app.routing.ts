import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from '../component/home/home.component'
import { LoginFormComponent } from '../component/login-form/login-form.component'
import { RegisterFormComponent } from '../component/register-form/register-form.component';

import { CanActivateViaAuthGuardService } from '../service/can-activate-via-auth-guard.service';
import { InternshipFormComponent } from "../component/internship-form/internship-form.component";
import { CanActivateAdminComponentService } from "../service/can-activate-admin-component.service";
import { InternshipDetailComponent } from "../component/internship-detail/internship-detail.component";



export const routing: ModuleWithProviders = RouterModule.forRoot([
    { path: '', redirectTo: 'home', pathMatch:'full' },
    { path: 'home', component: HomeComponent, canActivate: [CanActivateViaAuthGuardService] },
    { path: 'internship/new', component: InternshipFormComponent, canActivate: [CanActivateViaAuthGuardService, CanActivateAdminComponentService] },
    { path: 'internship/edit/:_id', component: InternshipFormComponent, canActivate: [CanActivateViaAuthGuardService, CanActivateAdminComponentService] },
    { path: 'internship/detail/:_id', component: InternshipDetailComponent, canActivate: [CanActivateViaAuthGuardService] },
    { path: 'login', component: LoginFormComponent },
    { path: 'register', component: RegisterFormComponent },
    { path: '**', redirectTo: '' }
]);