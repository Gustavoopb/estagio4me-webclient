import { Component, OnInit, Input} from '@angular/core'
import { LoginService } from '../../service/login.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css'],

})

export class LoginFormComponent implements OnInit {
  @Input() username: String
  @Input() password: String
  public loginForm: FormGroup

  constructor(fb: FormBuilder, public loginService: LoginService, public router: Router) {
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
      var body = JSON.parse(res.text())
      sessionStorage.setItem('auth_token', body['token'])
      sessionStorage.setItem('user', JSON.stringify(body['user']))
      this.router.navigate(['', 'home'])
    }, error => {
      console.log(error)
    })
  }
}