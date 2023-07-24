import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {

  constructor(private router: Router, private loginService: AuthService) {}

  onSubmit(form: NgForm) {
    this.loginService.login(form.value.email, form.value.password);
    //this.loginService.getUsername();
  }

  
}
