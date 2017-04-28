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
    var filter = this.isAdminUser() ? {} : { isActive: true }
    this.internshipService.findByFilter(filter).subscribe(res => {
      if (res.json()) {
        this.internships = res.json()
        console.log(res.json()[0])
      }
    }, err => {
      console.log(err)
    })
  }

  isAdminUser() {
    return this.loginService.isAdmin()
  }

  activeIntenrship(internship: Object) {
    internship['isActive'] = !internship['isActive']
    this.internshipService.update(internship).subscribe(res => {
      console.log(res.json())
    }, err => {
      console.log(err)
    })
  }
  getInternshipColor(isActive: boolean){
    return isActive ? "primary" : "warn"
  }
}
