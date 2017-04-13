import { Component, OnInit, Input } from '@angular/core';
import { Http } from '@angular/http';
import { Router, CanActivate } from '@angular/router'
import { LoginService } from '../../service/login.service';
import { InternshipService } from "../../service/internship.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public internships: Array<Object> = []

  constructor(public router: Router, public loginService: LoginService, public internshipService: InternshipService) {
  }

  ngOnInit() {
    this.internshipService.findAll().subscribe(res => {
      if (res.json()) {
        this.internships = res.json()
      }
      console.log(this.internships)
    }, err => {
      console.log(err)
    })
  }

}
