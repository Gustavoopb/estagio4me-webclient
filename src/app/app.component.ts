import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Router } from '@angular/router'
import { LoginService } from './service/login.service';
import { IUser } from './model/user.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnChanges {
  title = 'Estágio4me';
  user: IUser

  constructor(public router: Router, public loginService: LoginService) {

  }

  ngOnInit() {
    this.checkUserSession()
  }

  ngOnChanges() {
    this.checkUserSession()
  }

  logout() {
    this.loginService.logout()
    this.router.navigate(['', 'login'])
  }

  checkUserSession(){
    if (this.loginService.loggedIn()) {
      this.user = JSON.parse(sessionStorage.getItem('user'))
    }
  }
}
