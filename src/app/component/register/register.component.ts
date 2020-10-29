import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {UserService} from '../../service/user/user.service';
import {PasswordValidation} from './password-validator';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {NgxSpinnerService} from 'ngx-spinner';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private userService: UserService,
              private snackBar: MatSnackBar,
              private spinner: NgxSpinnerService) {
  }

  // tslint:disable-next-line:typedef
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

  // tslint:disable-next-line:ban-types
  private responseData: any;

  hide = true;
  namePattern = '^[A-Za-z]{2,}$';
  emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';
  passwordPattern = '^((?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[@#$%]).{6,})$';

  city = new FormControl('', Validators.required);

  registerForm = this.formBuilder.group({
      firstname: ['', [Validators.required, Validators.pattern(this.namePattern)]],
      lastname: ['', [Validators.required, Validators.pattern(this.namePattern)]],
      email: ['', [Validators.required, Validators.pattern(this.emailPattern)]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.pattern(this.passwordPattern)]],
      confirmPassword: ['', Validators.required],
      city: this.city
    }
    , {
      validator: PasswordValidation.MatchPassword
    });


  optionsWithoutSort = ['Agra', 'AJMER', 'ALLAHABAD', 'Aurangabad',
    'Amritsar', 'Ranchi', 'Gurgaon', 'Mumbai', 'Bangalore', 'Delhi',
    'Hyderabad', 'Ahmedabad', 'Chennai', 'Kolkata', 'Surat',
    'Pune', 'Jaipur', 'Lucknow', 'Kanpur', 'Nagpur', 'Indore', 'Thane', 'Bhopal'];


  options = this.optionsWithoutSort.sort();

  filteredOptions: Observable<string[]>;

  ngOnInit(): void {
    this.filteredOptions = this.city.valueChanges.pipe(
      startWith(''),
      map(value => this.filter(value))
    );
  }

  private filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(option =>
      option.toLowerCase().includes(filterValue));
  }


  redirectToLogin(): void {
    this.router.navigate(['/login']);
  }

  onSubmit(): void {
    this.spinner.show();
    const data = {
      firstName: this.firstname.value,
      lastName: this.lastname.value,
      email: this.email.value,
      password: this.password.value,
      city: this.city.value
    };
    this.userService.register(data)
      .subscribe(response => {
        this.responseData = response.body;
        this.spinner.hide();
        this.openSnackBar('Dismiss');
      }, (error) => {
        this.responseData = error.error;
        this.openSnackBar('Dismiss');
      });

    this.redirectToLogin();
  }

  openSnackBar(action): void {
    this.snackBar.open(this.responseData.message, action, {duration: 4000});
  }

}
