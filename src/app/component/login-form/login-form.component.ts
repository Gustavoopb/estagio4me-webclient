import {MdSnackBar} from '@angular/material/snack-bar';
import { Component, OnInit, Input} from '@angular/core'
import { LoginService } from '../../service/login.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, Route } from '@angular/router';
import { RegisterFormComponent } from "../register-form/register-form.component";

@Component({
  selector: 'login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css'],

})

export class LoginFormComponent implements OnInit {
  @Input() username: String
  @Input() password: String
  public loginForm: FormGroup
  public route: Route

  constructor(fb: FormBuilder, public loginService: LoginService, public router: Router, public snackBar: MdSnackBar) {
    this.loginForm = fb.group({
      password: ['', Validators.compose([Validators.required, Validators.minLength(8)])],
      username: ['', Validators.required]
    })
  }
  ngOnInit() {
  }

  public login($event) {
    event.preventDefault()
    this.loginService.login({ username: this.username, password: this.password }).subscribe(res => {
      var body = res.json()
      sessionStorage.setItem('auth_token', body['token'])
      sessionStorage.setItem('user', JSON.stringify(body['user']))
      this.snackBar.open(body['message'], "close", {
        duration: 3000,
      })
      this.router.navigate(['', 'home'])
    }, error => {
      console.log(error)
    })
  }
}