import { CanActivate, Router } from '@angular/router'
import { Component, Input, OnDestroy, OnInit } from '@angular/core';

import { Http } from '@angular/http';
import { InternshipModel } from "../../model/internship.model";
import { InternshipService } from "../../service/internship.service";
import { LoginService } from '../../service/login.service';
import { Subscription } from "rxjs/Subscription";
import { WebsocketService } from "../../service/websocket.service";

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  public internships: Array<InternshipModel> = []
  private _subs: Subscription[] = []

  constructor(public loginService: LoginService, public internshipService: InternshipService, public websocketService: WebsocketService) { }

  ngOnInit() {
    this.reloadInternships()
    this.subscribeInternshipSocket()
  }

  ngOnDestroy() {
    this._subs.forEach((sub) => sub.unsubscribe())
  }

  reloadInternships() {
    var filter = this.isAdminUser() ? {} : { _isActive: true }
    this._subs.push(
      this.internshipService.findByFilter(filter).subscribe(res => {
        if (res.json()) {
          var internList = res.json().map((json) => new InternshipModel(json))
          this.internships = internList
        }
      }, err => {
        console.log(err)
      })
    )
  }

  public subscribeInternshipSocket() {
    this.websocketService.getInternship().subscribe((result: InternshipModel) => {
      if (!this.isAdminUser()) {
        result = new InternshipModel(result)
        var internship = this.internships.find((internship, index) => internship.id == result.id)
        let index = this.internships.indexOf(internship)
        if (index > -1) {
          if (result.isActive) {
            this.internships[index] = result
            return
          }
          this.internships.splice(index, 1)
        } else {
          this.internships.push(result)
          this.internships = this.internships.sort((a, b) => a.createdAt < b.createdAt ? 1 : a.createdAt > b.createdAt ? -1 : 0)
        }
      }
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
