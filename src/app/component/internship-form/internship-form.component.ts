import { ActivatedRoute, Router } from '@angular/router'
import { Component, Input, OnInit, ViewChild } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'

import { InternshipModel } from '../../model/internship.model'
import { InternshipService } from '../../service/internship.service'
import { MdSlider } from '@angular/material'
import { Observable } from 'rxjs/Observable'
import { SkillModel } from '../../model/skill.model'
import { SkillService } from '../../service/skill.service'
import { Subscription } from 'rxjs/Subscription'
import { WebsocketService } from "../../service/websocket.service";

@Component({
  selector: 'internship-form',
  templateUrl: './internship-form.component.html',
  styleUrls: ['./internship-form.component.css']
})
export class InternshipFormComponent implements OnInit {

  @Input() internship: InternshipModel
  @ViewChild(MdSlider) slider: MdSlider
  private _sub: Subscription
  public skills: SkillModel[]
  public internshipForm: FormGroup

  constructor(public activatedRoute: ActivatedRoute, fb: FormBuilder,
    public internshipService: InternshipService, public router: Router,
    public skillService: SkillService, public websocketService: WebsocketService) {
    this.internshipForm = fb.group({
      companyName: ['', Validators.required],
      role: ['', Validators.required],
      compensation: ['', Validators.required],
      isCompanyPrivate: ['', Validators.required],
      isCompensationPrivate: ['', Validators.required],
      requiredSkills: ['', Validators.required],
      preferredSkills: ['', Validators.required],
      contact: ['', Validators.required],
      area: ['', Validators.required],
      description: ['', Validators.required]
    })
    this.internship = new InternshipModel()
    this.internship.requiredSkills = []
    this.internship.preferredSkills = []
    this._sub = this.activatedRoute.params.subscribe((param) => {
      if (param['_id']) {
        this.internshipService.findOneByFilter(param).subscribe(res => {
          if (res.json()) {
            this.internship.setValues(res.json())
          } else {
            this.router.navigate(['/home'])
          }
        })
      }
    })
  }

  ngOnInit() {
    this.skillService.findAll().subscribe(
      res => {
        this.skills = res.json().map(data => new SkillModel(data))
      },
      err => {
        console.log(err)
      })
  }

  requiredSkills(event) {
    this.internship.requiredSkills = event
  }

  preferredSkills(event) {
    this.internship.preferredSkills = event
  }

  submitInternship(event: any) {
    event.preventDefault()
    if (this.internship.id) {
      this.internshipService.update(this.internship).subscribe(res => {
        this.internship = new InternshipModel(res.json())
        this.websocketService.updatedInternship(res.json())
        this.router.navigate(['/internship', 'detail', this.internship.id])
      }, err => {
        console.log(err)
      })
    } else {
      this.internshipService.insert(this.internship).subscribe(res => {
        this.internship = new InternshipModel(res.json())
        this.router.navigate(['/internship', 'detail', this.internship.id])
      }, err => {
        console.log(err)
      })
    }
  }
}
