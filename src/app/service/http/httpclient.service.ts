import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {INote} from '../../component/note/note';

@Injectable({
  providedIn: 'root'
})
export class HttpclientService {


  constructor(private httpClient: HttpClient) {
  }


  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      AuthorizeToken: localStorage.getItem('token')
    })
  };

  // tslint:disable-next-line:typedef
  postdata(data, url) {
    return this.httpClient.post<any>(url, data, {observe: 'response' as 'body'})
      .pipe(catchError(this.handleError));
  }

  // tslint:disable-next-line:typedef
  handleError(error: HttpErrorResponse) {
    return throwError(error);
  }

  // tslint:disable-next-line:typedef
  putdata(data: { password: any; confirmPassword: any }, url: string) {
    return this.httpClient.put(url, data);
  }

  // tslint:disable-next-line:typedef
  addNote(data: { note_id: number; description: any; title: any }, url: string) {
    return this.httpClient.post(url, data, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  getNotes(url: string): Observable<INote[]> {
    return this.httpClient.get<INote[]>(url, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

}
