import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {Observable, throwError} from 'rxjs';
import {HttpBackend, HttpClient, HttpErrorResponse, HttpEvent, HttpRequest} from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import {IUser} from '../../component/collaborator/IUser';

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

  getLoginUser(email: string): Observable<IUser> {
    const apiUrl: string = this.baseUrl + this.user + 'user-data/' + email;
    // @ts-ignore
    return this.httpClient.get(apiUrl);
  }


  pushFileToStorage(file: File): Observable<any> {
    // const formdata: FormData = new FormData();
    // formdata.append('file', file);
    // const apiUrl: string = this.baseUrl + this.user + 'uploadFile';
    // const req = new HttpRequest('POST', apiUrl, formdata, {
    //   reportProgress: true,
    //   responseType: 'text'
    // });
    // return this.httpClient.request(req);

    const formdata: FormData = new FormData();
    formdata.append('file', file);
    const apiUrl: string = this.baseUrl + this.user + 'uploadFile';
    return this.httpClient.post(apiUrl, formdata)
      .pipe(catchError(this.handleError));
  }
}
