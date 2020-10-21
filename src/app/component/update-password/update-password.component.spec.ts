import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {RouterTestingModule} from '@angular/router/testing';
import {BrowserModule} from '@angular/platform-browser';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {UpdatePasswordComponent} from './update-password.component';


describe('UpdatePasswordComponent', () => {
  let component: UpdatePasswordComponent;
  let fixture: ComponentFixture<UpdatePasswordComponent>;


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UpdatePasswordComponent],
      imports: [
        BrowserModule,
        ReactiveFormsModule,
        HttpClientModule,
        FormsModule,
        RouterTestingModule.withRoutes([]),
        MatSnackBarModule
      ],
      providers: []
    })
      .compileComponents();
  });


  beforeEach(() => {
    fixture = TestBed.createComponent(UpdatePasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('form invalid when empty', () => {
    expect(component.resetPwForm.valid).toBeFalsy();
  });


  // ************password****************

  it('password field require validity', () => {
    const value = component.resetPwForm.controls.password;
    const errors = value.errors;
    expect(errors.required).toBeTruthy();
  });

  it('password field without special character', () => {
    const password = component.resetPwForm.controls.password;
    password.setValue('Asha123');
    const errors = password.errors;
    expect(errors.pattern).toBeTruthy();
  });

  it('password field length minimum 5', () => {
    const password = component.resetPwForm.controls.password;
    password.setValue('A@1a');
    const errors = password.errors;
    expect(errors.pattern).toBeTruthy();
  });

  it('password field With Capital letter and no only', () => {
    const password = component.resetPwForm.controls.password;
    password.setValue('AAAA1a');
    const errors = password.errors;
    expect(errors.pattern).toBeTruthy();
  });

  it('password field With small letter and no only', () => {
    const password = component.resetPwForm.controls.password;
    password.setValue('aaaaa1a');
    const errors = password.errors;
    expect(errors.pattern).toBeTruthy();
  });


  it('password field correct value', () => {
    const password = component.resetPwForm.controls.password;
    password.setValue('Asha@123');
    expect(password.valid).toBeTruthy();
  });


  // ************confirm password****************

  it('password field require validity', () => {
    const value = component.resetPwForm.controls.confirmPassword;
    const errors = value.errors;
    expect(errors.required).toBeTruthy();
  });

  it('password field without special character', () => {
    const password = component.resetPwForm.controls.confirmPassword;
    password.setValue('Asha123');
    const errors = password.errors;
    expect(errors.pattern).toBeTruthy();
  });

  it('password field length minimum 5', () => {
    const password = component.resetPwForm.controls.confirmPassword;
    password.setValue('A@1a');
    const errors = password.errors;
    expect(errors.pattern).toBeTruthy();
  });

  it('password field With Capital letter and no only', () => {
    const password = component.resetPwForm.controls.confirmPassword;
    password.setValue('AAAA1a');
    const errors = password.errors;
    expect(errors.pattern).toBeTruthy();
  });

  it('password field With small letter and no only', () => {
    const password = component.resetPwForm.controls.confirmPassword;
    password.setValue('aaaaa1a');
    const errors = password.errors;
    expect(errors.pattern).toBeTruthy();
  });


  it('password field correct value', () => {
    const password = component.resetPwForm.controls.confirmPassword;
    password.setValue('Asha@123');
    expect(password.valid).toBeTruthy();
  });


});


