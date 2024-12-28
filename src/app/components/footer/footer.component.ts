import { Component } from '@angular/core';
import { faFacebook, faInstagram, faSoundcloud, faTiktok } from '@fortawesome/free-brands-svg-icons';
import { Router } from '@angular/router';



@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
  faFacebook=faFacebook;
  faInstagram=faInstagram;
  faSoundcloud=faSoundcloud;
  faTiktok=faTiktok;
  constructor(private router: Router,){}
  navigateToLogin() {
    this.router.navigate(['/login']); // Navigate to the register page
  }

}
