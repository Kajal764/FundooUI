import {NgModule} from '@angular/core';
import {LoginComponent} from './component/login/login.component';
import {RouterModule, Routes} from '@angular/router';
import {UpdatePasswordComponent} from './component/update-password/update-password.component';
import {ForgotPasswordComponent} from './component/forgot-password/forgot-password.component';
import {RegisterComponent} from './component/register/register.component';
import {DashboardComponent} from './component/dashboard/dashboard.component';
import {AuthGuard} from './auth.guard';
import {NoteHomePageComponent} from './component/note-home-page/note-home-page.component';
import {TrashComponent} from './component/trash/trash.component';
import {ArchiveComponent} from './component/archive/archive.component';
import {SearchComponent} from './component/search/search.component';
import {CreateLabelComponent} from './component/create-label/create-label.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'forgot-password',
    component: ForgotPasswordComponent
  },

  {
    path: 'register',
    component: RegisterComponent
  }
  , {
    path: 'update-password',
    component: UpdatePasswordComponent
  },
  {
    path: 'home',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        redirectTo: 'note',
        pathMatch: 'full'
      },
      {
        path: 'note',
        component: NoteHomePageComponent
      },
      {
        path: 'search',
        component: SearchComponent
      },
      {
        path: 'trash',
        component: TrashComponent
      },
      {
        path: 'archive',
        component: ArchiveComponent
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
