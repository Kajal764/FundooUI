import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpclientService} from '../http/httpclient.service';
import {Observable} from 'rxjs';
import {ILabel} from '../../component/create-label/ILabel';

@Injectable({
  providedIn: 'root'
})
export class LabelService {

  private url = environment.baseUrl;
  private label = 'fundoo/label/';


  constructor(private httpclientService: HttpclientService) {
  }

  postLabel(data, url: string): Observable<any> {
    return this.httpclientService.addData(data, this.url + this.label + url);
  }

  getList(): Observable<ILabel[]> {
    return this.httpclientService.getLabelList(this.url + this.label + 'list');
  }

  deleteLabel(labelId: number, apiCall: string): Observable<any> {
    return this.httpclientService.deleteData(`${this.url}${this.label}${apiCall}/${labelId}`);
  }

}
