import { Component } from '@angular/core';
import { faEye, faGear, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  faEye = faEye;
  faEyeSlash = faEyeSlash;
  faGear = faGear;

  viewBalance = true;

  changeViewBalance() {
    this.viewBalance = !this.viewBalance
  }
}
