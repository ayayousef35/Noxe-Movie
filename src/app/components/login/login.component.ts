import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { faClose } from '@fortawesome/free-solid-svg-icons';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  faClose=faClose;
  loginForm: FormGroup;
  loginError: string | null = null;
  submitted = false;
  loading = false;


  constructor(private fb: FormBuilder, private authService: AuthService,private router: Router,
    private route: ActivatedRoute) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  get f() {
    return this.loginForm.controls;
  }

  onLogin() {
    if (this.loginForm.invalid) {
      return;
    }
  
    this.loading = true;
    this.loginError = null;
  
    const formData = this.loginForm.value;
    this.authService.loginUser(formData.email, formData.password).subscribe(
      (success) => {
        this.loading = false;
        if (success) {
          // Redirect to the return URL or default to '/Movies'
          const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/Movies';
          this.router.navigate([returnUrl]);
        } else {
          this.loginError = 'Invalid email or password.';
        }
      },
      (error) => {
        this.loading = false;
        console.error('Login error:', error);
        this.loginError = 'An error occurred during login. Please try again.';
      }
    );
  }
  
  navigateToRegister() {
    this.router.navigate(['/register']); // Navigate to the register page
  }
  navigateToHome() {
    this.router.navigate(['/Home']);
  }

}
