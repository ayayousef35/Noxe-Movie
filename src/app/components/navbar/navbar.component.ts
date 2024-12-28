import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  loggedInUser: any = null;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    // Subscribe to the logged-in user changes
    this.authService.getLoggedInUserObservable().subscribe((user) => {
      this.loggedInUser = user;
    });
  }

  onLogout() {
    this.authService.logout();
  }
}
