import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `<div>
  <h1>Angular routes</h1>
  <rouret-outlet></rouret-outlet>
  </div>`,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'my-app';
}
