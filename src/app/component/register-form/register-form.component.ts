import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MdSnackBar } from '@angular/material'
import { RegisterService } from '../../service/register.service';
import { UserModel } from "../../model/user.model";

@Component({
  selector: 'register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css']
})
export class RegisterFormComponent implements OnInit {
  @Input() public user: UserModel = new UserModel()
  public registerForm: FormGroup

  constructor(fb: FormBuilder, public registerService: RegisterService, public router: Router, public snackBar: MdSnackBar) {
    this.registerForm = fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      password: ['', Validators.compose([Validators.required, Validators.minLength(8)])],
      email: ['', Validators.compose([Validators.required, Validators.pattern(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/)])],
      username: ['', Validators.required]
    })
  }

  ngOnInit() {
  }

  public submitRegistration(event) {
    event.preventDefault()
    this.registerService.regiterUser(this.user).subscribe(res => {
      this.router.navigate(['', 'login'])
      this.snackBar.open(res.json()['message'], "x", {
        duration: 3000,
      })
    },
      err => {
        console.log(err)
      }
    )
  }

  public checkEmailUsername(event: any) {
    let source = event.target.name
    if (this[source]) {
      let regex: RegExp = /[^\w\s@._-]/gi
      this[source] = this[source].toLowerCase().replace(regex, '').replace(' ', '')
      this.registerService.checkEmailUsername({ [source]: this[source] }).subscribe(
        res => {
          let reason = source + "Taken";
          var t: boolean = this.registerForm.invalid
          console.log(res.text(), t, this.registerForm.invalid)
          if (res.text() != "null") {
            console.log(res.text())
            this.registerForm.setErrors({ [reason]: true })
          } else {
            this.registerForm.setErrors(null)
          }
        },
        error => {
          console.log(error)
          this.registerForm.setErrors({ [error.message]: true })
        }
      )
    }
  }
}
