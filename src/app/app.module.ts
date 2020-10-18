import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {LoginComponent} from './component/login/login.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MaterialModule} from './material/material.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import {AppRoutingModule} from './app-routing.module';
import {ForgotPasswordComponent} from './component/forgot-password/forgot-password.component';
import {UpdatePasswordComponent} from './component/update-password/update-password.component';
import {RegisterComponent} from './component/register/register.component';
import {UserService} from './service/user/user.service';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import {DashboardComponent} from './component/dashboard/dashboard.component';
import {AuthGuard} from './auth.guard';
import {CreateNoteComponent} from './component/create-note/create-note.component';
import {NoteComponent} from './component/note/note.component';
import {IconsComponent} from './component/icons/icons.component';
import {DisplayNoteComponent} from './component/display-note/display-note.component';
import {UpdateNoteComponent} from './component/update-note/update-note.component';
import {TokenInterceptorService} from './service/token/token-interceptor.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ForgotPasswordComponent,
    UpdatePasswordComponent,
    RegisterComponent,
    DashboardComponent,
    CreateNoteComponent,
    NoteComponent,
    IconsComponent,
    DisplayNoteComponent,
    UpdateNoteComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MaterialModule,
    FlexLayoutModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [UserService,
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
