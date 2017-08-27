import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from "@angular/forms";
import { MdChip, MdChipList, MdSnackBar } from "@angular/material";

import { ProfileModel } from "../../model/profile.model";
import { ProfileService } from "../../service/profile.service";
import { SkillModel } from "../../model/skill.model";
import { SkillService } from "../../service/skill.service";
import { Subscriber } from "rxjs/Subscriber";
import { Subscription } from "rxjs/Subscription";

@Component({
  selector: 'profile-form',
  templateUrl: './profile-form.component.html',
  styleUrls: ['./profile-form.component.css']
})
export class ProfileFormComponent implements OnInit, OnDestroy {
  private _subs: Subscription[] = []
  public profile: ProfileModel
  public skills: SkillModel[]

  constructor(public skillService: SkillService, public fb: FormBuilder, public profileService: ProfileService,
    public snackBar: MdSnackBar) {
    this.profile = new ProfileModel()
    this.profile.likedSkills = []
    this.profile.experiencedSkills = []
  }

  public submit() {
    this._subs.push(
      this.profileService.save(this.profile).subscribe(
        res => {
          this.profile.setValues(res.json())
          this.snackBar.open("Perfil salvo com sucesso!", "x", {
            duration: 3000,
          })
        },
        err => {
          console.log(err)
        }
      )
    )
  }

  ngOnInit() {
    this._subs.push(
      this.skillService.findAll().subscribe(
        res => {
          this.skills = res.json().map(data => new SkillModel(data))
        },
        err => {
          console.log(err)
        })
    )
    this._subs.push(
      this.profileService.findOne().subscribe(
        res => {
          this.profile.setValues(res.json())
        },
        err => {
          console.log(err)
        }
      )
    )
  }

  ngOnDestroy(): void {
    this._subs.forEach(sub => sub.unsubscribe)
  }
}
