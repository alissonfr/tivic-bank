import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faEye, faGear, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { User } from 'src/app/models/user';
import { Security } from 'src/app/utils/security.util';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  faEye = faEye;
  faEyeSlash = faEyeSlash;
  faGear = faGear;

  user!: User;
  username: string = ''
  userInitials: string = ''
  viewBalance = true;

  constructor(
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.fetchUserData();
  }

  fetchUserData() {
    this.user = Security.getUser();

    if (this.user) {
      const name = this.user.name
      this.username = name.split(' ')[0];
      this.userInitials = name.split(" ").map((palavra) => palavra.charAt(0)).join("");
    }
    return;
  }

  changeViewBalance() {
    this.viewBalance = !this.viewBalance
  }

  logout() {
    Security.clear();
    this.router.navigate(['/login']);
  }
}
