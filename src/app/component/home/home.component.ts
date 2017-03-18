import { Component, OnInit, Input } from '@angular/core';
import { Http } from '@angular/http';
import { Router, CanActivate } from '@angular/router'
import { LoginService } from '../../service/login.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(public router: Router, public loginService: LoginService ) {
   }

  ngOnInit() {
  }
  
}
