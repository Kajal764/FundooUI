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
import {TrashComponent} from './component/trash/trash.component';
import {NoteHomePageComponent} from './component/note-home-page/note-home-page.component';
import {ArchiveComponent} from './component/archive/archive.component';
import {SearchComponent} from './component/search/search.component';
import {CreateLabelComponent} from './component/create-label/create-label.component';
import {MapLabelNoteComponent} from './component/map-label-note/map-label-note.component';
import {NgxMasonryModule} from 'ngx-masonry';
import {AmazingTimePickerModule} from 'amazing-time-picker';
import {ReminderComponent} from './component/reminder/reminder.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {ReminderNoteComponent} from './component/reminder-note/reminder-note.component';
import {CollaboratorComponent} from './component/collaborator/collaborator.component';
import {AvatarModule} from 'ngx-avatar';
import {GridViewNoteComponent} from './component/grid-view-note/grid-view-note.component';
// import {MatProgressSpinner, MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {NgxSpinnerModule} from 'ngx-spinner';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ForgotPasswordComponent,
    UpdatePasswordComponent,
    RegisterComponent,
    DashboardComponent,
    CreateNoteComponent,
    IconsComponent,
    NoteComponent,
    DisplayNoteComponent,
    UpdateNoteComponent,
    TrashComponent,
    NoteHomePageComponent,
    ArchiveComponent,
    SearchComponent,
    CreateLabelComponent,
    MapLabelNoteComponent,
    ReminderComponent,
    ReminderNoteComponent,
    CollaboratorComponent,
    GridViewNoteComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MaterialModule,
    FlexLayoutModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgxMasonryModule,
    AmazingTimePickerModule,
    MatDatepickerModule,
    MatNativeDateModule,
    AvatarModule,
    NgxSpinnerModule
  ],
  providers: [UserService,
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
