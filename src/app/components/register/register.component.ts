import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { faClose } from '@fortawesome/free-solid-svg-icons';





@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  faClose=faClose;
  registerForm: FormGroup;
  registerError: string | null = null;
  submitted = false;

  constructor(private authService: AuthService,
     private fb: FormBuilder,   
     private router: Router // Inject Router
  ) {
    this.registerForm = this.fb.group(
      {
        fristname: ['', [Validators.required, Validators.minLength(3)]],
        lastname: ['', [Validators.required, Validators.minLength(4)]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required]
      },
      {
        // Custom validator to check that password and confirmPassword match
        validators: this.matchPasswords('password', 'confirmPassword')
      }
    );
  }

  // Custom validator for matching passwords
  matchPasswords(password: string, confirmPassword: string) {
    return (formGroup: FormGroup) => {
      const passwordControl = formGroup.controls[password];
      const confirmPasswordControl = formGroup.controls[confirmPassword];

      if (confirmPasswordControl.errors && !confirmPasswordControl.errors['mustMatch']) {
        return;
      }

      if (passwordControl.value !== confirmPasswordControl.value) {
        confirmPasswordControl.setErrors({ mustMatch: true });
      } else {
        confirmPasswordControl.setErrors(null);
      }
    };
  }

  // Getter for easy access to form controls in the template
  get f() {
    return this.registerForm.controls;
  }

  onRegister() {
    this.submitted = true;

    // Stop if the form is invalid
    // Stop if the form is invalid
  if (this.registerForm.invalid) {
    return;
  }

  const formData = this.registerForm.value;

  this.authService.registerUser({
    fristname: formData.fristname,
    lastname: formData.lastname,
    email: formData.email,
    password: formData.password
  }).subscribe(
    (response) => {
      // alert('Registration successful!');
      this.router.navigate(['/login']);
      console.log('User added:', response);
    },
    (error) => {
      this.registerError = 'Failed to register. Please try again later.';
      console.error(error);
    }
  );
}
navigateBackLogin() {
  this.router.navigate(['/login']); // Navigate to the register page
}
navigateToHome() {
  this.router.navigate(['/Home']);
}
}