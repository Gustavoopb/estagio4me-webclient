import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from "../../service/login.service";
import { InternshipService } from "../../service/internship.service";
import { InternshipModel } from "../../model/internship.model";
import { Subscription } from "rxjs/Subscription";

@Component({
  selector: 'internship-detail',
  templateUrl: './internship-detail.component.html',
  styleUrls: ['./internship-detail.component.css']
})
export class InternshipDetailComponent implements OnInit, OnDestroy {
  private _sub: Subscription;

  public internship: InternshipModel

  constructor(public activatedRoute: ActivatedRoute, public loginService: LoginService, public internshipService: InternshipService) {
    this._sub = this.activatedRoute.params.subscribe((param) => {
      this.internship = new InternshipModel(param)
    })
  }

  ngOnInit() {
    this.internshipService.findOneByFilter(this.internship).subscribe(res => {
      this.internship = new InternshipModel(res.json())
    })
  }

  ngOnDestroy(){
    this._sub.unsubscribe()
  }

}
