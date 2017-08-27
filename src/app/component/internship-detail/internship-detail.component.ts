import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';

import { InternshipModel } from "../../model/internship.model";
import { InternshipService } from "../../service/internship.service";
import { LoginService } from "../../service/login.service";
import { ProfileModel } from "../../model/profile.model";
import { ProfileService } from "../../service/profile.service";
import { RatingModel } from "../../model/rating.model";
import { RatingService } from "../../service/rating.service";
import { SkillModel } from "../../model/skill.model";
import { Subscription } from "rxjs/Subscription";

@Component({
  selector: 'internship-detail',
  templateUrl: './internship-detail.component.html',
  styleUrls: ['./internship-detail.component.css']
})
export class InternshipDetailComponent implements OnInit, OnDestroy {
  private _subs: Subscription[] = [];
  public profile: ProfileModel
  public internship: InternshipModel
  public rating: RatingModel = new RatingModel()

  constructor(public activatedRoute: ActivatedRoute, public loginService: LoginService,
    public internshipService: InternshipService, public ratingService: RatingService,
    public profileService: ProfileService) {
    this.rating.user = this.loginService.loggedUser()
    this.rating.internship = this.internship
  }

  ngOnInit() {
    this._subs.push(
      this.activatedRoute.params.subscribe((param) => {
        this.internship = new InternshipModel(param)
      })
    )
    this._subs.push(
      this.internshipService.findOneByFilter(this.internship).subscribe(
        res => {
          this.internship.setValues(res.json())
        }
      )
    )
    this._subs.push(
      this.ratingService.findOne(this.rating).subscribe(
        res => {
          if (res.json()) {
            this.rating.setValues(res.json())
          } else {
            this.rating.stars = 0
          }
        },
        err => console.log(err)
      )
    )
    this._subs.push(
      this.profileService.findOne().subscribe(
        res => {
          this.profile = new ProfileModel(res.json())
        },
        err => console.log(err)
      )
    )
  }

  starEvent() {
    if (this.rating.stars) {
      this._subs.push(
        this.ratingService.save(this.rating).subscribe(
          res => {
            this.rating.setValues(res.json())
          }, err => console.log(err)
        )
      )
    } else {
      this._subs.push(
        this.ratingService.delete(this.rating).subscribe(
          res => {
            this.rating.createdAt = undefined
            this.rating.updatedAt = undefined
          }, err => console.log(err)
        )
      )
    }
  }

  chipColor(skill: SkillModel) {
    if (this.profile != undefined) {
      return this.profile.experiencedSkills.filter((sk) => sk.valueOf() == skill.valueOf()).length ?
        "primary" : this.profile.likedSkills.filter((sk) => sk.valueOf() == skill.valueOf()).length ? "accent" : "warn"
    }
  }

  ngOnDestroy() {
    this._subs.forEach((sub) => sub.unsubscribe())
  }

}
