import { Component } from '@angular/core';
import { AtmComponent } from './atm/atm.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [AtmComponent],
  template: `<app-atm></app-atm>`
})
export class AppComponent {}
