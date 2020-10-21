import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {RouterTestingModule} from '@angular/router/testing';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {RegisterComponent} from './register.component';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegisterComponent],
      imports: [
        BrowserModule,
        ReactiveFormsModule,
        HttpClientModule,
        MatCardModule,
        FormsModule,
        MatIconModule,
        RouterTestingModule.withRoutes([]),
        MatSnackBarModule
      ],
      providers: []
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('form invalid when empty', () => {
    expect(component.registerForm.valid).toBeFalsy();
  });

  // ************email****************
  it('email field require validity', () => {
    const email = component.registerForm.controls.email;
    const errors = email.errors;
    expect(errors.required).toBeTruthy();
  });

  it('email  validity without @ ', () => {
    const email = component.registerForm.controls.email;
    email.setValue('kajalw1998gmail.com');
    const errors = email.errors;
    expect(errors.pattern).toBeTruthy();
  });

  it('email  validity without .com ', () => {
    const email = component.registerForm.controls.email;
    email.setValue('kajalw1998gmail@dfdf');
    const errors = email.errors;
    expect(errors.pattern).toBeTruthy();
  });

  it('email  validity without .com and @', () => {
    const email = component.registerForm.controls.email;
    email.setValue('kajalw1998gmail');
    const errors = email.errors;
    expect(errors.pattern).toBeTruthy();
  });

  it('email field correct value', () => {
    const email = component.registerForm.controls.email;
    email.setValue('kajalw1998@gmail.com');
    expect(email.valid).toBeTruthy();
  });


  // ************password****************

  it('password field require validity', () => {
    const value = component.registerForm.controls.password;
    const errors = value.errors;
    expect(errors.required).toBeTruthy();
  });

  it('confirmPassword field require validity', () => {
    const value = component.registerForm.controls.confirmPassword;
    const errors = value.errors;
    expect(errors.required).toBeTruthy();
  });


  it('password field without special character', () => {
    const password = component.registerForm.controls.password;
    password.setValue('Asha123');
    const errors = password.errors;
    expect(errors.pattern).toBeTruthy();
  });

  it('password field length minimum 5', () => {
    const password = component.registerForm.controls.password;
    password.setValue('A@1a');
    const errors = password.errors;
    expect(errors.pattern).toBeTruthy();
  });

  it('password field With Capital letter and no only', () => {
    const password = component.registerForm.controls.password;
    password.setValue('AAAA1a');
    const errors = password.errors;
    expect(errors.pattern).toBeTruthy();
  });

  it('password field With small letter and no only', () => {
    const password = component.registerForm.controls.password;
    password.setValue('aaaaa1a');
    const errors = password.errors;
    expect(errors.pattern).toBeTruthy();
  });


  it('password field correct value', () => {
    const password = component.registerForm.controls.password;
    password.setValue('Asha@123');
    expect(password.valid).toBeTruthy();
  });


  // ************first name****************

  it('first name field require validity', () => {
    const value = component.registerForm.controls.firstname;
    const errors = value.errors;
    expect(errors.required).toBeTruthy();
  });

  it('first name field correct value', () => {
    const firstname = component.registerForm.controls.firstname;
    firstname.setValue('kajal');
    expect(firstname.valid).toBeTruthy();
  });

  it('firstname with special symbol', () => {
    const firstname = component.registerForm.controls.firstname;
    firstname.setValue('kajal@');
    expect(firstname.valid).toBeFalsy();
  });

  it('firstname field with number', () => {
    const firstname = component.registerForm.controls.firstname;
    firstname.setValue('kajal3');
    expect(firstname.valid).toBeFalsy();
  });

  it('firstname field length less than 2', () => {
    const firstname = component.registerForm.controls.firstname;
    firstname.setValue('k');
    expect(firstname.valid).toBeFalsy();
  });

  it('firstname field with space', () => {
    const firstname = component.registerForm.controls.firstname;
    firstname.setValue('kajal waghmare');
    expect(firstname.valid).toBeFalsy();
  });


  it('lastname field require validity', () => {
    const value = component.registerForm.controls.lastname;
    const errors = value.errors;
    expect(errors.required).toBeTruthy();
  });

  it('lastname field correct value', () => {
    const lastname = component.registerForm.controls.lastname;
    lastname.setValue('waghmare');
    expect(lastname.valid).toBeTruthy();
  });

  it(' with special symbol', () => {
    const lastname = component.registerForm.controls.lastname;
    lastname.setValue('shetty@');
    expect(lastname.valid).toBeFalsy();
  });

  it('lastname field with number', () => {
    const firstname = component.registerForm.controls.firstname;
    firstname.setValue('shetty23');
    expect(firstname.valid).toBeFalsy();
  });

  it('lastname field length less than 2', () => {
    const lastname = component.registerForm.controls.lastname;
    lastname.setValue('k');
    expect(lastname.valid).toBeFalsy();
  });

  it('lastname field with space', () => {
    const lastname = component.registerForm.controls.lastname;
    lastname.setValue('kajal waghmare');
    expect(lastname.valid).toBeFalsy();
  });


});


