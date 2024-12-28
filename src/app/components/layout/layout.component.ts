import { Component } from '@angular/core';
import { Router,Event } from '@angular/router';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent {
  constructor(private router: Router) {
    // Subscribe to routing events
    this.router.events.subscribe((event: Event) => {
      console.log(event);
    });
  }
}
