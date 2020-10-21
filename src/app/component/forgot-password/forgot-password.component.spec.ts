import {ComponentFixture, fakeAsync, TestBed} from '@angular/core/testing';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {RouterTestingModule} from '@angular/router/testing';
import {BrowserModule} from '@angular/platform-browser';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {ForgotPasswordComponent} from './forgot-password.component';


describe('ForgotPasswordComponent', () => {
  let component: ForgotPasswordComponent;
  let fixture: ComponentFixture<ForgotPasswordComponent>;


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ForgotPasswordComponent],
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
    fixture = TestBed.createComponent(ForgotPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('form invalid when empty', () => {
    expect(component.formEmail.valid).toBeFalsy();
  });

  // ************email****************

  it('email field require validity', () => {
    const email = component.formEmail.controls.email;
    const errors = email.errors;
    expect(errors.required).toBeTruthy();
  });

  it('email  validity without @ ', () => {
    const email = component.formEmail.controls.email;
    email.setValue('kajalw1998gmail.com');
    const errors = email.errors;
    expect(errors.pattern).toBeTruthy();
  });

  it('email  validity without .com ', () => {
    const email = component.formEmail.controls.email;
    email.setValue('kajalw1998gmail@dfdf');
    const errors = email.errors;
    expect(errors.pattern).toBeTruthy();
  });

  it('email  validity without .com and @', () => {
    const email = component.formEmail.controls.email;
    email.setValue('kajalw1998gmail');
    const errors = email.errors;
    expect(errors.pattern).toBeTruthy();
  });

  it('email field correct value', () => {
    const email = component.formEmail.controls.email;
    email.setValue('kajalw1998@gmail.com');
    expect(email.valid).toBeTruthy();
  });

});


