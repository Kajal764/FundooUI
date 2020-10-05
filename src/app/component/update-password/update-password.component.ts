import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['../login/login.component.scss']
})
export class UpdatePasswordComponent implements OnInit {

  hide: boolean = true;
  isValidFormSubmitted = null;
  passwordPattern = '^((?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[@#$%]).{6,})$';

  constructor(private formBuilder: FormBuilder, private router: Router) {
  }

  resetPwForm = this.formBuilder.group({
    password: ['', [Validators.required, Validators.minLength(6), Validators.pattern(this.passwordPattern)]],
    confirmPassword: ['', [Validators.required, Validators.minLength(6), Validators.pattern(this.passwordPattern)]]

  });

  // tslint:disable-next-line:typedef
  ngOnInit() {
  }

  get password() {
    return this.resetPwForm.get('password');
  }

  get confirmPassword() {
    return this.resetPwForm.get('confirmPassword');
  }


  // tslint:disable-next-line:typedef
  onSubmit() {
    this.isValidFormSubmitted = false;
    if (this.resetPwForm.invalid) {
      return;
    }
    this.isValidFormSubmitted = true;
  }


}
