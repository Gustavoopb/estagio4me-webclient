import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from '../component/home/home.component'
import { LoginFormComponent } from '../component/login-form/login-form.component'
import { RegisterFormComponent } from '../component/register-form/register-form.component';

import { CanActivateViaAuthGuardService } from '../service/can-activate-via-auth-guard.service';



export const routing: ModuleWithProviders = RouterModule.forRoot([
    // { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: LoginFormComponent },
    { path: 'home', component: HomeComponent, canActivate:  [CanActivateViaAuthGuardService]},
    { path: 'register', component: RegisterFormComponent },
    { path: '**', redirectTo: 'login' }
]);