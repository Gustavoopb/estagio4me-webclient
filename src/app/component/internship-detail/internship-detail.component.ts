import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from "../../service/login.service";
import { InternshipService } from "../../service/internship.service";
import { InternshipModel } from "../../model/internship.model";
import { Subscription } from "rxjs/Subscription";
import { RatingModel } from "../../model/rating.model";
import { RatingService } from "../../service/rating.service";

@Component({
  selector: 'internship-detail',
  templateUrl: './internship-detail.component.html',
  styleUrls: ['./internship-detail.component.css']
})
export class InternshipDetailComponent implements OnInit, OnDestroy {
  private _subs: Subscription[] = [];

  public internship: InternshipModel
  public rating: RatingModel = new RatingModel()

  constructor(public activatedRoute: ActivatedRoute, public loginService: LoginService,
    public internshipService: InternshipService, public ratingService: RatingService) {
    this._subs.push(this.activatedRoute.params.subscribe((param) => {
      this.internship = new InternshipModel(param)
    }))
    this.rating.user = this.loginService.loggedUser()
    this.rating.internship = this.internship
  }

  ngOnInit() {
    this._subs.push(this.internshipService.findOneByFilter(this.internship).subscribe(res => {
      this.internship.setValues(res.json())
    }))
    this._subs.push(
      this.ratingService.findOne(this.rating).subscribe(
        res => {
          if (res.json()) {
            this.rating.setValues(res.json())
          } else {
            this.rating.stars = 0
          }
        },
        err => {
          console.log(err)
        }
      )
    )
  }

  starEvent($event) {
    this.rating.stars = $event
    if (this.rating.stars) {
      this._subs.push(this.ratingService.save(this.rating).subscribe(res => {
        this.rating.setValues(res.json())
      }, err => {
        console.log(err)
      }))
    } else {
      this._subs.push(this.ratingService.delete(this.rating).subscribe(res => {
        this.rating.createdAt = undefined
        this.rating.updatedAt = undefined
      }, err => {
        console.log(err)
      }))
    }
  }

  ngOnDestroy() {
    this._subs.forEach((sub) => sub.unsubscribe())
  }

}
