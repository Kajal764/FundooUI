import {NgModule} from '@angular/core';
import {LoginComponent} from './component/login/login.component';
import {RouterModule, Routes} from '@angular/router';
import {UpdatePasswordComponent} from './component/update-password/update-password.component';
import {ForgotPasswordComponent} from './component/forgot-password/forgot-password.component';
import {RegisterComponent} from './component/register/register.component';
import {DashboardComponent} from './component/dashboard/dashboard.component';

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
  }, {
    path: 'home',
    component: DashboardComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
