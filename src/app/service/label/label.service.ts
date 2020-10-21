import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpclientService} from '../http/httpclient.service';
import {Observable} from 'rxjs';
import {INote} from '../../component/note/note';
import {ILabel} from '../../component/create-label/ILabel';

@Injectable({
  providedIn: 'root'
})
export class LabelService {

  private url = environment.baseUrl;
  private label = 'fundoo/label/';


  constructor(private httpclientService: HttpclientService) {
  }

  createLabel(data, url: string): Observable<any> {
    return this.httpclientService.addData(data, this.url + this.label + url);
  }

  getList(): Observable<ILabel[]> {
    return this.httpclientService.getLabelList(this.url + this.label + 'list');
  }


}
