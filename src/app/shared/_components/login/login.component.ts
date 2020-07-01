import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthenticationService } from '../../_service/authentication/authentication.service';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'jobportal-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  errorMessage: string;
  showLoginError: boolean = false;

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ) {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])
    });
  }

  get _l() {
    return this.loginForm.controls;
  }

  ngOnInit(): void {
  }

  redirectSignup() {
    this.router.navigateByUrl('/registration');
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.authenticationService
      .login(this._l.email.value, this._l.password.value)
      .pipe(first())
      .subscribe((data: any) => {
        if (data.role === 'Admin') {
          this.router.navigateByUrl('/admin');
       } else if (data.role === 'Employer') {
          this.router.navigateByUrl('/employer');
        } else if (data.role === 'Employee') {
          this.router.navigateByUrl('/employee');
        }
      }, (error: any) => {
        this.errorMessage = error.error.message;
        this.showLoginError = true;
      });
    }
  }
}
