import {Injectable} from '@angular/core';
import {HttpclientService} from '../http/httpclient.service';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs';
import {INote} from '../../component/note/note';
import {IUser} from '../../component/collaborator/IUser';

// import {IUser} from '../../component/collaborator/IUser';

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  private url = environment.baseUrl;
  private note = 'fundoo/note/';


  constructor(private httpclientService: HttpclientService) {
  }

  createNote(data, apiUrl: string): Observable<any> {
    return this.httpclientService.addData(data, this.url + this.note + apiUrl);
  }

  getList(apiUrl: string): Observable<INote[]> {
    return this.httpclientService.getList(this.url + this.note + apiUrl);
  }

  editNote(data: any): Observable<any> {
    return this.httpclientService.updateData(data, this.url + this.note + 'update');
  }

  deleteNote(noteId: number, apiCall: string): Observable<any> {
    return this.httpclientService.putData(`${this.url}${this.note}${apiCall}/${noteId}`);
  }

  updateColor(data: { note_id: number; color: string }): Observable<any> {
    return this.httpclientService.updateData(data, this.url + this.note + 'color');
  }

  permanentDelete(noteId: number): Observable<any> {
    return this.httpclientService.deleteData(this.url + this.note + 'trash/' + noteId);
  }

  putData(data: { note_Id: any; remainder: string }, url: string): Observable<any> {
    return this.httpclientService.setReminder(data, this.url + this.note + url);
  }

  deleteReminder(noteId: number): Observable<any> {
    return this.httpclientService.deleteData(this.url + this.note + 'reminder/' + noteId);
  }

  getUserList(url: string): Observable<IUser[]> {
    return this.httpclientService.getUserList(this.url + this.note + url);
  }

  removeCollabUser(data: { note_Id: number; email: string }, url: string): Observable<any> {
    return this.httpclientService.removeCollab(data,`${this.url}${this.note}/${url}`);
  }
}

