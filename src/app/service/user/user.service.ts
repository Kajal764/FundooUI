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
}
