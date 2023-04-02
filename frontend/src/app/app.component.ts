import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
  <app-header *ngIf="showHeader" />
  <router-outlet></router-outlet>
`
})
export class AppComponent {
  showHeader: boolean = true;
  title = 'tivic_bank';
}
