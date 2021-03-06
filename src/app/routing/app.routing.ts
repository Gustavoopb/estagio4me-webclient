import { RouterModule, Routes } from '@angular/router';

import { CanActivateAdminComponentService } from "../service/can-activate/can-activate-admin-component.service";
import { CanActivateUnloggedService } from "../service/can-activate/can-activate-unlogged.service";
import { CanActivateViaAuthGuardService } from '../service/can-activate/can-activate-via-auth-guard.service';
import { HomeComponent } from '../component/home/home.component'
import { InternshipDetailComponent } from "../component/internship-detail/internship-detail.component";
import { InternshipFormComponent } from "../component/internship-form/internship-form.component";
import { LoginFormComponent } from '../component/login-form/login-form.component'
import { ModuleWithProviders } from '@angular/core';
import { ProfileFormComponent } from "../component/profile-form/profile-form.component";
import { RatingComponent } from "../component/rating/rating.component";
import { RegisterFormComponent } from '../component/register-form/register-form.component';

export const routing: ModuleWithProviders = RouterModule.forRoot([
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'internship/new', component: InternshipFormComponent, canActivate: [CanActivateViaAuthGuardService, CanActivateAdminComponentService] },
    { path: 'internship/edit/:_id', component: InternshipFormComponent, canActivate: [CanActivateViaAuthGuardService, CanActivateAdminComponentService] },
    { path: 'internship/detail/:_id', component: InternshipDetailComponent, canActivate: [CanActivateViaAuthGuardService] },
    { path: 'ratings', component: RatingComponent, canActivate: [CanActivateViaAuthGuardService] },
    { path: 'login', component: LoginFormComponent, canActivate: [CanActivateUnloggedService] },
    { path: 'profile', component: ProfileFormComponent, canActivate: [CanActivateViaAuthGuardService] },
    { path: 'register', component: RegisterFormComponent, canActivate: [CanActivateUnloggedService] },
    { path: '**', redirectTo: 'home' }
]);