import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HttpclientService {

  constructor(private httpClient: HttpClient) {
  }

  postdata(data, url) {
    return this.httpClient.post<any>(url, data, {observe: 'response' as 'body'})
      .pipe(catchError(this.handleError));
  }

  // tslint:disable-next-line:typedef
  handleError(error: HttpErrorResponse) {
    return throwError(error);
  }

  putdata(data: { password: any; confirmPassword: any }, url: string) {
    return this.httpClient.put(url, data);
  }

  // tslint:disable-next-line:typedef
  addNote(data: { note_id: number; description: any; title: any }, url: string) {
    const token = localStorage.getItem('token');
    console.log(token);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        AuthorizeToken: token
      })
    };
    return this.httpClient.post(url, data, httpOptions)
      .pipe(catchError(this.handleError));
  }

}
