import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {INote} from '../../component/note/note';
import {ILabel} from '../../component/create-label/ILabel';
import {IUser} from '../../component/collaborator/IUser';

@Injectable({
  providedIn: 'root'
})
export class HttpclientService {

  constructor(private httpClient: HttpClient) {
  }

  handleError(error: HttpErrorResponse): Observable<never> {
    return throwError(error);
  }

  addData(data: { note_id: number; description: any; title: any }, url: string): Observable<any> {
    return this.httpClient.post(url, data)
      .pipe(catchError(this.handleError));
  }

  getList(url: string): Observable<INote[]> {
    return this.httpClient.get<INote[]>(url)
      .pipe(catchError(this.handleError));
  }

  getUserList(url: string): Observable<IUser[]> {
    return this.httpClient.get<IUser[]>(url)
      .pipe(catchError(this.handleError));
  }

  updateData(data: any, url: string): Observable<any> {
    return this.httpClient.put(url, data)
      .pipe(catchError(this.handleError));
  }

  putData(url: string): Observable<any> {
    return this.httpClient.put(url, null)
      .pipe(catchError(this.handleError));
  }

  deleteData(url: string): Observable<any> {
    return this.httpClient.delete(url)
      .pipe(catchError(this.handleError));
  }

  getLabelList(url: string): Observable<ILabel[]> {
    return this.httpClient.get<ILabel[]>(url)
      .pipe(catchError(this.handleError));
  }

  setReminder(data: { note_Id: any; remainder: string }, url: string): Observable<any> {
    return this.httpClient.put(url, data)
      .pipe(catchError(this.handleError));
  }

  removeCollab(data: { note_Id: number; email: string }, url: string): Observable<any> {
    return this.httpClient.put(url, data).pipe(catchError(this.handleError));;
  }
}
