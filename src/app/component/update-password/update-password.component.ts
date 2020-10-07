import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {UserService} from '../../service/user/user.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['../login/login.component.scss']
})
export class UpdatePasswordComponent implements OnInit {

  hide = true;
  isValidFormSubmitted = null;
  passwordPattern = '^((?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[@#$%]).{6,})$';
  private token: any;
  private responseData: any;

  constructor(private formBuilder: FormBuilder, private router: Router,
              private activatedRoute: ActivatedRoute, private userService: UserService, private snackBar: MatSnackBar) {
  }

  resetPwForm = this.formBuilder.group({
    password: ['', [Validators.required, Validators.minLength(6), Validators.pattern(this.passwordPattern)]],
    confirmPassword: ['', [Validators.required, Validators.minLength(6), Validators.pattern(this.passwordPattern)]]

  });

  // tslint:disable-next-line:typedef
  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.token = params['token'];
      console.log(this.token);
    });
  }

  // tslint:disable-next-line:typedef
  get password() {
    return this.resetPwForm.get('password');
  }

  // tslint:disable-next-line:typedef
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
    const data = {
      password: this.password.value,
      confirmPassword: this.confirmPassword.value
    };
    this.userService.updatePassword(data, this.token)
      .subscribe(response => {
        this.responseData = response;
        this.redirectToLogin();
      }, (error) => {
        this.responseData = error.error;
      });
    this.openSnackBar('Dismiss');
  }

  // tslint:disable-next-line:typedef
  openSnackBar(action) {
    this.snackBar.open(this.responseData.message, action, {duration: 2000});
  }

  // tslint:disable-next-line:typedef
  redirectToLogin() {
    this.openSnackBar('Dismiss');
    this.router.navigate(['/login']);
  }

}

