import { MdSidenav } from '@angular/material/sidenav';
import { LoginService } from '../../service/login.service';
import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: 'sidenav-menu',
  templateUrl: './sidenav-menu.component.html',
  styleUrls: ['./sidenav-menu.component.css']
})
export class SidenavMenuComponent implements OnInit {

  public menus: Object[]

  constructor(public loginService: LoginService, public sidenav: MdSidenav, public router: Router) {
    router.events.subscribe(() => {
      this.resetMenus()
    })
  }

  public resetMenus() {

    this.menus = [
      {
        routerLink: ['/home'],
        label: 'Home',
        render: this.isLoggedIn()
      }, {
        routerLink: ['/internship', 'new'],
        label: 'Novo Estágio',
        render: this.isAdminUser()
      }, {
        routerLink: ['/stared'],
        label: 'Estrelas',
        render: this.isLoggedIn()
      }, {
        routerLink: ['/about'],
        label: 'Sobre',
        render: this.getTrue()
      },
    ]
  }

  ngOnInit() {
  }

  public isAdminUser() {
    return this.loginService.isAdmin()
  }

  public isLoggedIn() {
    return this.loginService.isLoggedIn()
  }

  public getTrue() {
    return true
  }

}
