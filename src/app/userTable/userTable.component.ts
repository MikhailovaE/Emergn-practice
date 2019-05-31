import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { User } from '../core/user.interface'

@Component({
  selector: 'userTable.component',
  styleUrls: ['userTable.component.css'],
  templateUrl: 'userTable.component.html',
})
export class UserTableComponent implements OnInit {
  displayedColumns: string[] = ['name', 'username', 'email', 'password', 'actions'];
  dataSource: User[];

  constructor(
    private cookieService: CookieService,
    private router: Router,
  ) { }

  ngOnInit() {
    let username = this.cookieService.get('user');
    if (username === '') {
      this.router.navigate(['']);
      return;
    }
    var users: User[] = JSON.parse(localStorage.getItem('users'));
    if (users === null) { users = []; }
    users.forEach(function (u: User) {
      if (u.username !== username) {
        u.password = '********';
      }
    })
    this.dataSource = users;
  }

  deleteUser(username: string) {
    for (var i = 0; i < this.dataSource.length; i++) {
      if (username === this.dataSource[i].username) {
        this.dataSource.splice(i, 1);
        localStorage.setItem('users', JSON.stringify(this.dataSource));
        if (username === this.cookieService.get('user')) {
          this.cookieService.set('user', "");
        }
        this.router.navigate(['']);
        return;
      }
    }
  }

  logOut() {
    this.cookieService.set('user', "");
    this.router.navigate(['']);
  }
}
