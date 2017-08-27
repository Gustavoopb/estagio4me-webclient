import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'stars',
  templateUrl: './stars.component.html',
  styleUrls: ['./stars.component.css']
})
export class StarsComponent implements OnInit {

  private _maxStars: number = 5
  private _counterValue: number = 0;
  public starsArray: Array<Star>

  @Input() public disabled: Boolean = false

  @Output("valueChange") rating = new EventEmitter();

  constructor() {
    this._counterValue = 0
  }

  @Input("value")
  get value() {
    return this._counterValue;
  }

  set value(val) {
    if (val != undefined) {
      this._counterValue = val;
      this.rating.emit(this.value);
    }
  }

  public rate(key) {
    var star = this.starsArray[key]
    if (this._counterValue == key && star.value == 0) {
      star.value = 0.5
    }
    else if (this._counterValue == key + 1) {
      star.value = 0
    } else {
      star.value = 1
    }
    this.value = star.value + key
    this.loadStars()
  }

  private loadStars() {
    let aux: number = isNaN(this._counterValue % 1) ? 0 : this._counterValue % 1
    let selectedKey: number = aux ? this._counterValue - aux : this._counterValue
    this.starsArray.forEach((star, index) => {
      star.value = index == selectedKey ? aux : selectedKey > index ? 1 : 0
    })
  }

  ngOnInit() {
    var arr = []
    for (var index = 0; index < this._maxStars; index++) {
      arr[index] = new Star(index, 0)
    }
    this.starsArray = arr
    this.loadStars()
  }
}

class Star {
  private _icons = { 0: "star_border", 0.5: "star_half", 1: "star" }
  public key: number
  public value: number
  constructor(key: number, value: number) {
    this.key = key
    this.value = value
  }

  public get icon() {
    return this._icons[this.value]
  }
}