import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, ValidatorFn, Validators} from '@angular/forms';
import {Router} from '@angular/router';


function confirmPassword(control: FormControl, group: FormGroup, matchPassword: string) {
  if (!control.value || group.controls[matchPassword].value !== null || group.controls[matchPassword].value === control.value) {
    return null;
  }
  return {'mismatch': true};
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private router: Router) {
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
    confirmPassword: ['', [Validators.required, Validators.minLength(6), (control => confirmPassword(control, this.registerForm, 'password'))]]
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

  onSubmit() {

  }


}
