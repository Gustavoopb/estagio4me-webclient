import { Component, Input, OnDestroy, OnInit } from '@angular/core';

import { LoginService } from './service/login.service';
import { Router } from '@angular/router'
import { SidenavMenuComponent } from "./component/sidenav-menu/sidenav-menu.component";
import { Subscription } from "rxjs/Subscription";
import { UserModel } from "./model/user.model";

@Component({
  selector: 'root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'Estágio4me';
  user: UserModel
  subs: Subscription[] = []

  constructor(public router: Router, public loginService: LoginService) {
    this.subs.push(
      this.router.events.subscribe(() => {
        if (this.loginService.isLoggedIn()) {
          this.loginService.reAuth().subscribe(res => {
            var user: UserModel = new UserModel(res.json().user)
            if (user.id) {
              this.loginService.storeLogin(user, res.json().token)
            } else {
              this.loginService.logout()
            }
          }, err => {

          })
        }
      })
    )

    this.subs.push(router.events.subscribe(() => { this.checkUserLocal() }))
  }

  ngOnInit() {
    this.checkUserLocal()
  }

  ngOnDestroy() {
    this.subs.forEach((sub: Subscription) => {
      sub.unsubscribe()
    })
  }

  logout() {
    this.loginService.logout()
    this.router.navigate(['', 'login'])
  }

  checkUserLocal() {
    if (this.loginService.isLoggedIn()) {
      this.user = this.loginService.loggedUser()
    } else {
      this.user = null
    }
  }
}
