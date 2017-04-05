import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from '../component/home/home.component'
import { LoginFormComponent } from '../component/login-form/login-form.component'
import { RegisterFormComponent } from '../component/register-form/register-form.component';

import { CanActivateViaAuthGuardService } from '../service/can-activate-via-auth-guard.service';
import { InternshipFormComponent } from "../component/internship-form/internship-form.component";



export const routing: ModuleWithProviders = RouterModule.forRoot([
    // { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'home', component: HomeComponent, canActivate:  [CanActivateViaAuthGuardService]},
    { path: 'internship', component: InternshipFormComponent, canActivate:  [CanActivateViaAuthGuardService]},    
    { path: 'login', component: LoginFormComponent },
    { path: 'register', component: RegisterFormComponent },
    { path: '**', redirectTo: 'login' }
]);