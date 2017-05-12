import { Component, OnInit, Input, ViewChild } from '@angular/core'
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { InternshipService } from "../../service/internship.service";
import { Router, ActivatedRoute } from "@angular/router";
import { SkillService } from "../../service/skill.service";
import { MdAutocompleteTrigger, MdSlider } from "@angular/material";
import { Observable } from "rxjs/Observable";
import { Subscription } from "rxjs/Subscription";
import { InternshipModel } from "../../model/internship.model";
import { SkillModel } from "../../model/skill.model";


@Component({
  selector: 'app-internship-form',
  templateUrl: './internship-form.component.html',
  styleUrls: ['./internship-form.component.css']
})
export class InternshipFormComponent implements OnInit {

  @Input() internship: InternshipModel
  @ViewChild(MdSlider) slider: MdSlider
  private _sub: Subscription
  public skills: SkillModel[]
  public filteredSkills: any
  public inputSkillSelected: string
  public internshipForm: FormGroup

  constructor(public activatedRoute: ActivatedRoute, fb: FormBuilder, public internshipService: InternshipService, public router: Router, public skillService: SkillService) {
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
          if(res.json()){
          this.internship.setValues(res.json())
          }else{
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

  public addSkill(event) {
    var has: boolean = false
    this.internship[this.inputSkillSelected].forEach((skill: SkillModel) => {
      if (typeof skill != undefined && skill.name == event.source.value.name) {
        has = true
        return
      }
    })
    if (!has) {
      this.internship[this.inputSkillSelected].push(event.source.value)
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
    var index = this.internship[from].indexOf(skill, 0);
    if (index > -1) {
      this.internship[from].splice(index, 1);
    }
  }

  filterSkills(val: string): SkillModel[] {
    var result = val ? this.skills.filter((skill: SkillModel) => new RegExp(val, 'gi').test(skill.name)) : this.skills;
    return result.length > 15 ? result.slice(0, 5) : result

  }

  displayParser(skill: SkillModel) {
    // var has: boolean = false
    // this.internship[this.inputSkillSelected].filter((sk: SkillModel) => {
    //   if (sk.name == skill.name) {
    //     has = true
    //     return
    //   }
    // })
    // if (!has) {
    //   this.internship[this.inputSkillSelected].push(skill)
    // }
    // this.internshipForm.get(this.inputSkillSelected).setValue('')
    return skill ? skill.name : skill
  }

  submitInternship(event: any) {
    event.preventDefault()
    if (this.internship.id) {
      console.log("Edit")
      this.internshipService.update(this.internship).subscribe(res => {
        this.internship = new InternshipModel(res.json())
        this.router.navigate(['/internship', 'detail', this.internship.id])
      }, err => {
        console.log(err)
      })
    } else {
      console.log("New")
      this.internshipService.insert(this.internship).subscribe(res => {
        this.internship = new InternshipModel(res.json())
        this.router.navigate(['/internship', 'detail', this.internship.id])
      }, err => {
        console.log(err)
      })
    }
  }
}
