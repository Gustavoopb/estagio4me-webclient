import { Component, OnInit, Input, ViewChild } from '@angular/core'
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { InternshipService } from "../../service/internship.service";
import { Router } from "@angular/router";
import { SkillService } from "../../service/skill.service";
import { MdAutocompleteTrigger, MdSlider } from "@angular/material";
import { Observable } from "rxjs/Observable";
import { Subscription } from "rxjs/Subscription";
import { MdOptionSelectEvent } from "@angular/material/core/option/option";


@Component({
  selector: 'app-internship-form',
  templateUrl: './internship-form.component.html',
  styleUrls: ['./internship-form.component.css']
})
export class InternshipFormComponent implements OnInit {

  @Input() companyName: String
  @Input() role: String
  @Input() compensation: Number
  @Input() isCompanyPrivate: Boolean = false
  @Input() isCompensationPrivate: Boolean = false
  requiredSkills = []
  preferedSkills = []
  @Input() contact: String
  @Input() area: String
  @ViewChild(MdSlider) slider: MdSlider
  sub: Subscription


  public skills: Array<Object>
  public filteredSkills: any
  public inputSkillSelected: string

  public internshipForm: FormGroup

  constructor(fb: FormBuilder, public internshipService: InternshipService, public router: Router, public skillService: SkillService) {
    this.internshipForm = fb.group({
      companyName: ['', Validators.required],
      role: ['', Validators.required],
      compensation: ['', Validators.required],
      isCompanyPrivate: ['', Validators.required],
      isCompensationPrivate: ['', Validators.required],
      requiredSkills: ['', Validators.required],
      preferedSkills: ['', Validators.required],
      contact: ['', Validators.required],
      area: ['', Validators.required]
    })
  }

  ngOnInit() {
    this.skillService.findAll().subscribe(
      res => {
        this.skills = JSON.parse(res.text())
      },
      err => {
        console.log(err)
      })
  }

  addSkill(event: MdOptionSelectEvent) {
    var has: boolean = false
    this[this.inputSkillSelected].filter(ob => {
      if (ob.name == event.source.value.name) {
        has = true
        return
      }
    })
    if (!has) {
      this[this.inputSkillSelected].push(event.source.value)
    }
    this.internshipForm.get(this.inputSkillSelected).setValue('')
  }

  changeComplete(event: any) {
    event.preventDefault()
    this.inputSkillSelected = event.target.name
    this.filteredSkills = this.internshipForm.get(this.inputSkillSelected).valueChanges
      .startWith(event.target.value)
      .map(name => this.filterSkills(name))
  }

  removeSkill(event: any, skill: Object, from: string) {
    event.preventDefault()
    var index = this[from].indexOf(skill, 0);
    if (index > -1) {
      this[from].splice(index, 1);
    }
  }

  filterSkills(val: string) {
    return val ? this.skills.filter((skill) => new RegExp(val, 'gi').test(skill['name'])) : this.skills;
  }

  displarParser(skill: any) {
    return skill ? skill.name : skill
  }

  submitInternship(event: any) {
    event.preventDefault()
    var internship = {
      companyName: this.companyName,
      role: this.role,
      compensation: this.compensation,
      isCompanyPrivate: this.isCompanyPrivate,
      isCompensationPrivate: this.isCompensationPrivate,
      requiredSkills: this.requiredSkills,
      preferedSkills: this.preferedSkills,
      contact: this.contact,
      area: this.area
    }
    this.internshipService.insert(internship).subscribe(res => {
      this.router.navigate(['', 'internship'])
    }, err => {
      console.log(err)
    })
  }
}
