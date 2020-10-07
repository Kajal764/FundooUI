import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {UserService} from '../../service/user/user.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {HttpResponse} from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {

  hide = true;
  isValidFormSubmitted = null;
  emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';
  passwordPattern = '^((?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[@#$%]).{6,})$';
  private responseData: any;

  constructor(private formBuilder: FormBuilder, private router: Router, private userService: UserService
    , private snackBar: MatSnackBar) {
  }

  loginForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.pattern(this.emailPattern)]],
    password: ['', [Validators.required, Validators.minLength(6), Validators.pattern(this.passwordPattern)]]
  });

  // tslint:disable-next-line:typedef
  ngOnInit() {
  }

  // tslint:disable-next-line:typedef
  get email() {
    return this.loginForm.get('email');
  }

  // tslint:disable-next-line:typedef
  get password() {
    return this.loginForm.get('password');
  }

  // tslint:disable-next-line:typedef
  async onSubmit() {
    this.isValidFormSubmitted = false;
    if (this.loginForm.invalid) {
      return;
    }
    this.isValidFormSubmitted = true;
    const data = {
      email: this.email.value,
      password: this.password.value
    };

    this.userService.login(data)
      .subscribe((response: HttpResponse<any>) => {
          localStorage.setItem('token', response.headers.get('AuthorizeToken'));
          this.responseData = response.body;
          console.log(localStorage.getItem('token'));
        },
        (error) => {
          this.responseData = error.error;
        });
    await this.openSnackBar('Dismiss');
  }

  // tslint:disable-next-line:typedef
  openSnackBar(action) {
    this.snackBar.open(this.responseData.message, action, {duration: 3000});
  }

  // tslint:disable-next-line:typedef
  redirect() {
    this.router.navigate(['/forgot-password']);
  }

  // tslint:disable-next-line:typedef
  redirectToRegister() {
    this.router.navigate(['/register']);
  }
}
