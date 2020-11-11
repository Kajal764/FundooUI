import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {UserService} from '../../service/user/user.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {HttpResponse} from '@angular/common/http';
import {NgxSpinnerService} from 'ngx-spinner';
import {FacebookLoginProvider, GoogleLoginProvider, SocialAuthService, SocialUser} from 'angularx-social-login';

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
  public isSocialLogin = false;
  public user: SocialUser;

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private userService: UserService,
              private snackBar: MatSnackBar,
              private spinner: NgxSpinnerService,
              private authService: SocialAuthService) {
  }

  loginForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.pattern(this.emailPattern)]],
    password: ['', [Validators.required, Validators.minLength(6), Validators.pattern(this.passwordPattern)]]
  });

  ngOnInit(): void {
    this.authService.authState.subscribe((user) => {
      this.user = user;
    });
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
  onSubmit() {
    this.isValidFormSubmitted = false;
    if (this.loginForm.invalid) {
      return;
    }
    this.isValidFormSubmitted = true;
    const data = {
      email: this.email.value,
      password: this.password.value
    };
    this.userService.login(data, 'login')
      .subscribe((response: HttpResponse<any>) => {
          localStorage.setItem('token', `Bearer ${response.headers.get('AuthorizeToken')}`);
          localStorage.setItem('email', data.email);
          this.responseData = response.body;
          this.openSnackBar('Dismiss');
          this.redirectToDashboard();
        },
        (error) => {
          this.responseData = error.error;
          this.openSnackBar('Dismiss');
        });
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

  private redirectToDashboard(): void {
    this.openSnackBar('Dismiss');
    this.router.navigate(['/home']);
  }

  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID)
      .then(data => {
        const userData = {
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          imageURL: data.photoUrl
        };
        this.isSocialLogin = true;
        this.socialLogin(userData);
      });
  }

  socialLogin(userData: { firstName: string; lastName: string; imageURL: string; email: string }): void {
    this.userService.login(userData, 'social-login')
      .subscribe((response: HttpResponse<any>) => {
          localStorage.setItem('token', `Bearer ${response.headers.get('AuthorizeToken')}`);
          localStorage.setItem('email', userData.email);
          this.responseData = response.body;
          this.redirectToDashboard();
        },
        (error) => {
          this.responseData = error.error;
          this.openSnackBar('Dismiss');
        });
  }
}
