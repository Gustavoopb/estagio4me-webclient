import { InternshipModel } from '../../model/internship.model';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'internship-list-item',
  templateUrl: './internship-list-item.component.html',
  styleUrls: ['./internship-list-item.component.css']
})
export class InternshipListItemComponent implements OnInit {

  @Input() public internship: InternshipModel

  constructor() { }

  ngOnInit() {
  }

}
