import { MdSnackBar, MdDialog } from "@angular/material";
import { Component, OnInit, Input } from '@angular/core'
import { LoginService } from '../../service/login.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, Route } from '@angular/router';
import { RegisterFormComponent } from "../register-form/register-form.component";
import { UserModel } from "../../model/user.model";

@Component({
  selector: 'login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css'],

})
export class LoginFormComponent implements OnInit {
  @Input() public user: UserModel = new UserModel()
  public loginForm: FormGroup
  public route: Route

  constructor(fb: FormBuilder, public loginService: LoginService, public router: Router, public snackBar: MdSnackBar, public dialog: MdDialog) {
    this.loginForm = fb.group({
      password: ['', Validators.compose([Validators.required, Validators.minLength(8)])],
      username: ['', Validators.required]
    })
  }
  ngOnInit() {
  }

  public login($event) {
    event.preventDefault()
    this.loginService.login(this.user).subscribe(res => {
      var body = res.json()
      this.loginService.storeLogin(body['user'], body['token'])
      this.snackBar.open(body['message'], "x", {
        duration: 3000,
      })
      this.router.navigate(['/home'])
    }, error => {
      this.snackBar.open("Ops, você digitou login e senha corretamente?", "x", {
        duration: 3000,
      })
      console.log(error)
    })
  }

  public formatUsername(){
    let regex: RegExp = /[^\w\s@._-]/gi
    this.user.username = this.user.username.toLowerCase().replace(regex, '').replace(' ', '')
  }
}