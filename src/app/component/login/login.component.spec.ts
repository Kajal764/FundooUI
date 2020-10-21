import {async, ComponentFixture, fakeAsync, TestBed} from '@angular/core/testing';
import {LoginComponent} from './login.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {RouterTestingModule} from '@angular/router/testing';
import {BrowserModule} from '@angular/platform-browser';
import {MatSnackBarModule} from '@angular/material/snack-bar';


describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
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
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should set submitted to true', async(() => {
    component.onSubmit();
    expect(component.onSubmit).toBeTruthy();
  }));

  it('form invalid when empty', () => {
    expect(component.loginForm.valid).toBeFalsy();
  });


  // ************email****************

  it('email field require validity', () => {
    const email = component.loginForm.controls.email;
    const errors = email.errors;
    expect(errors.required).toBeTruthy();
  });

  it('email  validity without @ ', () => {
    const email = component.loginForm.controls.email;
    email.setValue('kajalw1998gmail.com');
    const errors = email.errors;
    expect(errors.pattern).toBeTruthy();
  });

  it('email  validity without .com ', () => {
    const email = component.loginForm.controls.email;
    email.setValue('kajalw1998gmail@dfdf');
    const errors = email.errors;
    expect(errors.pattern).toBeTruthy();
  });

  it('email  validity without .com and @', () => {
    const email = component.loginForm.controls.email;
    email.setValue('kajalw1998gmail');
    const errors = email.errors;
    expect(errors.pattern).toBeTruthy();
  });

  it('email field correct value', () => {
    const email = component.loginForm.controls.email;
    email.setValue('kajalw1998@gmail.com');
    expect(email.valid).toBeTruthy();
  });


  // ************password****************

  it('password field require validity', () => {
    const value = component.loginForm.controls.password;
    const errors = value.errors;
    expect(errors.required).toBeTruthy();
  });


  it('password field without special character', () => {
    const password = component.loginForm.controls.password;
    password.setValue('Asha123');
    const errors = password.errors;
    expect(errors.pattern).toBeTruthy();
  });

  it('password field length minimum 5', () => {
    const password = component.loginForm.controls.password;
    password.setValue('A@1a');
    const errors = password.errors;
    expect(errors.pattern).toBeTruthy();
  });

  it('password field With Capital letter and no only', () => {
    const password = component.loginForm.controls.password;
    password.setValue('AAAA1a');
    const errors = password.errors;
    expect(errors.pattern).toBeTruthy();
  });

  it('password field With small letter and no only', () => {
    const password = component.loginForm.controls.password;
    password.setValue('aaaaa1a');
    const errors = password.errors;
    expect(errors.pattern).toBeTruthy();
  });


  it('password field correct value', () => {
    const password = component.loginForm.controls.password;
    password.setValue('Asha@123');
    expect(password.valid).toBeTruthy();
  });
});


