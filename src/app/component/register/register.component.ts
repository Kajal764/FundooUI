import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {UserService} from '../../service/user/user.service';
import {PasswordValidation} from './password-validator';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  // tslint:disable-next-line:ban-types
  private responseData: any;

  constructor(private formBuilder: FormBuilder, private router: Router,
              private userService: UserService, private snackBar: MatSnackBar) {
  }

  hide = true;
  namePattern = '^[A-Za-z]{2,}$';
  emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';
  passwordPattern = '^((?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[@#$%]).{6,})$';

  registerForm = this.formBuilder.group({
      firstname: ['', [Validators.required, Validators.pattern(this.namePattern)]],
      lastname: ['', [Validators.required, Validators.pattern(this.namePattern)]],
      email: ['', [Validators.required, Validators.pattern(this.emailPattern)]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.pattern(this.passwordPattern)]],
      confirmPassword: ['', Validators.required]
    }
    , {
      validator: PasswordValidation.MatchPassword
    });

  ngOnInit(): void {
  }


  get firstname() {
    return this.registerForm.get('firstname');
  }

  get lastname() {
    return this.registerForm.get('lastname');
  }

  // tslint:disable-next-line:typedef
  get email() {
    return this.registerForm.get('email');
  }

  // tslint:disable-next-line:typedef
  get password() {
    return this.registerForm.get('password');
  }

  // tslint:disable-next-line:typedef
  get confirmPassword() {
    return this.registerForm.get('confirmPassword');
  }

  // tslint:disable-next-line:typedef
  redirectToLogin() {
    this.router.navigate(['/login']);
  }

  // tslint:disable-next-line:typedef
  onSubmit() {
    const data = {
      firstName: this.firstname.value,
      lastName: this.lastname.value,
      email: this.email.value,
      password: this.password.value
    };
    this.userService.register(data)
      .subscribe(response => {
        this.responseData = response;
        console.log(this.responseData);
      }, (error) => {
        this.responseData = error.error;
        console.log(this.responseData);
      });
    this.openSnackBar('Dismiss');
  }

  openSnackBar(action) {
    this.snackBar.open(this.responseData.message, action, {duration: 2000});
  }
}
