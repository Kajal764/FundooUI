import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {INote} from '../../component/note/note';

@Injectable({
  providedIn: 'root'
})
export class HttpclientService {

  constructor(private httpClient: HttpClient) {
  }

  handleError(error: HttpErrorResponse): Observable<never> {
    return throwError(error);
  }

  addNote(data: { note_id: number; description: any; title: any }, url: string): Observable<any> {
    return this.httpClient.post(url, data)
      .pipe(catchError(this.handleError));
  }

  getNotes(url: string): Observable<INote[]> {
    return this.httpClient.get<INote[]>(url)
      .pipe(catchError(this.handleError));
  }

  editNote(data: any, url: string): Observable<any> {
    return this.httpClient.put(url, data)
      .pipe(catchError(this.handleError));
  }
}
