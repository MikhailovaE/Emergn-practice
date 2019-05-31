import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { User } from '../core/user.interface';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm;
  registerForm;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private cookieService: CookieService,
    private snackBar: MatSnackBar) {
  }
  ngOnInit() {
    var currentUser = this.cookieService.get('user');
    if (currentUser !== '') {
      this.router.navigate(['table']);
    }

    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9]+$')]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });

    this.registerForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9]+$')]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      repeatPassword: ['', [Validators.required, Validators.minLength(8)]],
      name: ['', [Validators.required, Validators.pattern('^[a-zA-Z]+$')]],
    });
  }

  showError(errorMsg: string) {
    this.snackBar.open(errorMsg, '', { duration: 2500 });
  }

  login() {
    if (this.loginForm.valid) {
      var username = this.loginForm.value.username;
      var password = this.loginForm.value.password;

      var users: User[] = JSON.parse(localStorage.getItem('users'));
      if (users === null) {
        this.showError('No such user or invalid password!');
        return;
      }
      var successfulMatch = users.some(function (u: User, _, __) {
        return u.username === username && u.password === password;
      })

      if (!successfulMatch) {
        this.showError('No such user or invalid password!');
        return;
      }

      this.cookieService.set('user', username);
      this.router.navigate(['table']);
    }
  }

  register() {
    if (this.registerForm.valid) {
      if (this.registerForm.value.password != this.registerForm.value.repeatPassword) {
        this.showError('Passwords do not match!');
        return;
      }

      var user: User = {
        username: this.registerForm.value.username,
        email: this.registerForm.value.email,
        name: this.registerForm.value.name,
        password: this.registerForm.value.password
      };

      var users: User[] = JSON.parse(localStorage.getItem('users'));
      if (users === null) { users = []; }
      var alreadyRegistered = users.some(function (u: User, _, __) {
        return u.email === user.email || u.username === user.username;
      })

      if (alreadyRegistered) {
        this.showError('This email or username is already registered!');
        return;
      }
      users.push(user);
      localStorage.setItem('users', JSON.stringify(users));

      this.cookieService.set('user', user.username);
      this.router.navigate(['table']);
    }
  }
}
