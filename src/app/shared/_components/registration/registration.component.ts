import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthenticationService } from '../../_service/authentication/authentication.service';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';

@Component({
  selector: 'jobportal-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent implements OnInit {
  registartionForm: FormGroup;
  errorMessage: string;
  showLoginError: boolean = false;

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ) {
    this.registartionForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
      confirmpassword: new FormControl('', [Validators.required]),
      role: new FormControl('', [Validators.required])
    });
  }

  get _r() {
    return this.registartionForm.controls;
  }

  ngOnInit(): void {
  }

  redirectLogin() {
    this.router.navigateByUrl('/login');
  }

  onSubmit() {
    if (this.registartionForm.valid) {
      const data = {
        username: this._r.email.value,
        password: this._r.password.value,
        role: this._r.role.value
      };
      this.authenticationService.employeeRegister(data).pipe(first()).subscribe((response: any) => {
        if (response) {
          this.router.navigateByUrl('/login');
          alert('User Created Successfuly');
        }
      }, (error: any) => {
        this.errorMessage = error.error.message;
        this.showLoginError = true;
      });
    }
  }
}
