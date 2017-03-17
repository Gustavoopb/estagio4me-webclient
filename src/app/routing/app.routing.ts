import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from '../component/home/home.component'
import { LoginFormComponent } from '../component/login-form/login-form.component'
import { RegisterFormComponent } from '../component/register-form/register-form.component';



export const routing: ModuleWithProviders = RouterModule.forRoot([
    { path: '', component: HomeComponent },
    { path: 'login', component: LoginFormComponent },
    { path: 'register', component: RegisterFormComponent },
    { path: '**', redirectTo: '' }
]);