import {Injectable} from '@angular/core';
import {HttpclientService} from '../http/httpclient.service';
import {environment} from '../../../environments/environment';

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
  // getNote() {
  //   return this.httpclientService.getData(this.url + this.note + 'list');
  // }
}
