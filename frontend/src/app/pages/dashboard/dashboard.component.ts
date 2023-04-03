import { Component, OnInit } from '@angular/core';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  faEye = faEye;
  faEyeSlash = faEyeSlash;

  viewBalance = true;
  operation: number | null = null

  ngOnInit(): void {
    
  }

  changeViewBalance() {
    this.viewBalance = !this.viewBalance
  }

  changeOperation(operation: number) {
    if (this.operation === operation) {
      this.operation = null;
    } else {
      this.operation = operation;
    }
  }
}
