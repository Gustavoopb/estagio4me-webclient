import { Component, OnInit, Input } from '@angular/core';
import { Http } from '@angular/http';
import { Router, CanActivate } from '@angular/router'
import { LoginService } from '../../service/login.service';
import { InternshipService } from "../../service/internship.service";
import { InternshipModel } from "../../model/internship.model";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public internships: Array<InternshipModel> = []

  constructor(public router: Router, public loginService: LoginService, public internshipService: InternshipService) { }

  ngOnInit() {
    this.reloadInternships()
  }

  reloadInternships() {
    var filter = this.isAdminUser() ? {} : { _isActive: true }
    this.internshipService.findByFilter(filter).subscribe(res => {
      if (res.json()) {
        var internList = res.json().map((json) => new InternshipModel(json))
        if (JSON.stringify(this.internships) != JSON.stringify(internList)) {
          this.internships = internList
        }
        setTimeout(() => { this.reloadInternships() }, 5000)
      }
    }, err => {
      console.log(err)
    })
  }

  public isAdminUser() {
    return this.loginService.isAdmin()
  }

  public isLoggedIn() {
    return this.loginService.isLoggedIn()
  }

  public getInternshipColor(isActive: boolean) {
    return isActive ? "primary" : "warn"
  }
}
