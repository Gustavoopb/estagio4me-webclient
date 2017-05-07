import { RatingModel } from '../../model/rating.model';
import { Component, OnInit } from '@angular/core';
import { RatingService } from "../../service/rating.service";
import { Subscription } from "rxjs";

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.css']
})
export class RatingComponent implements OnInit {

  private _subs: Subscription[] = []

  public ratings: RatingModel[] = []

  constructor(public ratingService: RatingService) { }

  ngOnInit() {
    this._subs.push(this.ratingService.findByAuthUser().subscribe(res => {
      if (res.json()) {
        this.ratings = res.json().map((json) => new RatingModel(json))
      }
    }, err => {
      console.log(err)
    }))
  }

  ngOnDestroy() {
    this._subs.forEach((sub) => sub.unsubscribe())
  }

}
