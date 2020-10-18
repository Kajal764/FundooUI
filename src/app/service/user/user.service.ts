import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {Observable, throwError} from 'rxjs';
import {HttpBackend, HttpClient, HttpErrorResponse} from '@angular/common/http';
import {catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = environment.baseUrl;
  private user = 'fundoo/user/';

  constructor(private httpClient: HttpClient, private httpBackend: HttpBackend) {
    this.httpClient = new HttpClient(httpBackend);
  }

  handleError(error: HttpErrorResponse): Observable<never> {
    return throwError(error);
  }

  postData(data, url): Observable<any> {
    console.log(data, url);
    return this.httpClient.post<any>(url, data, {observe: 'response' as 'body'})
      .pipe(catchError(this.handleError));
  }

  register(data): Observable<any> {
    const apiUrl: string = this.baseUrl + this.user + 'register';
    return this.postData(data, apiUrl);
  }

  login(data): Observable<any> {
    const apiUrl = this.baseUrl + this.user + 'login';
    return this.postData(data, apiUrl);
  }

  forgotPw(data: { email: any }): Observable<any> {
    const apiUrl: string = this.baseUrl + this.user + 'forgot_password';
    return this.postData(data, apiUrl);
  }

  updatePassword(data: { password: any; confirmPassword: any }, token): Observable<any> {
    const apiUrl: string = this.baseUrl + this.user + 'update_password/' + token;
    return this.httpClient.put(apiUrl, data);
  }

  loggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

}
