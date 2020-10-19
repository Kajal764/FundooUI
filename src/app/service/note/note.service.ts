import {Injectable} from '@angular/core';
import {HttpclientService} from '../http/httpclient.service';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs';
import {INote} from '../../component/note/note';

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  private url = environment.baseUrl;
  private note = 'fundoo/note/';


  constructor(private httpclientService: HttpclientService) {
  }

  createNote(data: { note_id: number; description: any; title: any }): Observable<any> {
    return this.httpclientService.addNote(data, this.url + this.note + 'create');
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
}

