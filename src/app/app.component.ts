import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router'
import { LoginService } from './service/login.service';
import { IUser } from './model/user.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Estágio4me';
  user: IUser

  constructor(public router: Router, public loginService: LoginService) {
    router.events.subscribe(() => {
      this.checkUserLocal()
    })
  }

  ngOnInit() {
    this.checkUserLocal()
  }

  logout() {
    this.loginService.logout()
    this.router.navigate(['', 'login'])
  }

  checkUserLocal() {
    if (this.loginService.loggedIn()) {
      this.user = JSON.parse(localStorage.getItem('user'))
    } else {
      this.user = null
    }
  }
}
