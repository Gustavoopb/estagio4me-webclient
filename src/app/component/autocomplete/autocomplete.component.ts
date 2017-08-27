import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { AbstractModel } from "../../model/abstract/abstract.model";
import { FormControl } from "@angular/forms";

@Component({
  selector: 'autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.css']
})
export class AutocompleteComponent implements OnInit {

  public inputItem: FormControl
  public filteredItems: any
  public _value: AbstractModel[] = []
  @Input() public autocompleteList = []
  @Input() public field: string
  @Input() public placeholder: string
  @Output("valueChange") public _valueChange = new EventEmitter<AbstractModel[]>()

  @Input("value")
  get value() {
    return this._value
  }

  set value(v: Array<AbstractModel>) {
    this._value = v
    this._valueChange.emit(this._value)
  }

  constructor() {
    this.inputItem = new FormControl()
    this.filteredItems = this.inputItem.valueChanges.map(name => this.filterItems(name))
  }

  filterItems(val: string) {
    val = val ? val.split('').map(char => `[${char}]`).join('') : val
    console.log(val)
    let result = val ? this.autocompleteList.filter(item => new RegExp(val, 'gi').test(item[this.field]))
      : this.autocompleteList
    if (result != undefined && result.length > 15) {
      return result.slice(0, 14)
    }
    return result
  }

  ngOnInit() {
  }

  public addItem(item) {
    if (this.value.indexOf(item) < 0) {
      this.value.push(item)
    }
  }

  public removeItem(item) {
    let index = this.value.indexOf(item)
    this.value.splice(index, 1)
  }
}