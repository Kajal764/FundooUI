import {Injectable} from '@angular/core';
import {HttpclientService} from '../http/httpclient.service';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  private url = environment.baseUrl;
  private note = 'fundoo/note/';


  constructor(private httpclientService: HttpclientService) {
  }

  // tslint:disable-next-line:typedef
  createNote(data: { note_id: number; description: any; title: any }) {
    return this.httpclientService.addNote(data, this.url + this.note + 'create');
  }


  // tslint:disable-next-line:typedef
  getNotes() {
    return this.httpclientService.getNotes(this.url + this.note + 'list');
  }

  editNote(data: any): Observable<any> {
    return this.httpclientService.editNote(data, this.url + this.note + 'update');
  }
}

