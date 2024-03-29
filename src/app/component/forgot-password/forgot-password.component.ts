import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import {UserService} from '../../service/user/user.service';
import {NgxSpinnerService} from 'ngx-spinner';


@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['../login/login.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  private responseData: any;

  constructor(private formBuilder: FormBuilder,
              private snackBar: MatSnackBar,
              private userService: UserService,
              private spinner: NgxSpinnerService) {
  }

  emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';

  formEmail = this.formBuilder.group({
    email: ['', [Validators.required, Validators.pattern(this.emailPattern)]],
  });

  ngOnInit(): void {
  }

  get email() {
    return this.formEmail.get('email');
  }

  onSubmit(): void {
    this.spinner.show();
    const data = {
      email: this.email.value
    };
    this.userService.forgotPw(data)
      .subscribe(response => {
        this.responseData = response.body;
      }, (error) => {
        this.responseData = error.error;
      });
    this.spinner.hide();
    this.openSnackBar('Dismiss');
  }

  openSnackBar(action): void {
    this.snackBar.open(this.responseData.message, action, {duration: 2000});
  }
}
