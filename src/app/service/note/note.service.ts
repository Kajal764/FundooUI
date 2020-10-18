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


  getNotes(): Observable<INote[]> {
    return this.httpclientService.getNotes(this.url + this.note + 'list');
  }

  editNote(data: any): Observable<any> {
    return this.httpclientService.editNote(data, this.url + this.note + 'update');
  }

  deleteNote(noteId: number): Observable<any> {
    return this.httpclientService.deleteData(`${this.url}${this.note}delete/${noteId}`);
  }
}

