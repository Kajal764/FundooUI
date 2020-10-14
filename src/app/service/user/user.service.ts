import {Injectable} from '@angular/core';
import {HttpclientService} from '../http/httpclient.service';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private url = environment.baseUrl;
  private user = 'fundoo/user/';

  constructor(private httpclientService: HttpclientService) {
  }

  // tslint:disable-next-line:typedef
  register(data) {
    return this.httpclientService.postdata(data, this.url + this.user + 'register');
  }

  // tslint:disable-next-line:typedef
  login(data) {
    return this.httpclientService.postdata(data, this.url + this.user + 'login');
  }

  // tslint:disable-next-line:typedef
  forgotPw(data: { email: any }) {
    return this.httpclientService.postdata(data, this.url + this.user + 'forgot_password');
  }

  // tslint:disable-next-line:typedef
  updatePassword(data: { password: any; confirmPassword: any }, token) {
    return this.httpclientService.putdata(data, this.url + this.user + 'update_password/' + token);
  }

  // tslint:disable-next-line:typedef
  loggedIn() {
    return !!localStorage.getItem('token');
  }

}
