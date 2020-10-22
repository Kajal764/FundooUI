import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {ILabel} from '../../component/create-label/ILabel';

@Injectable({
  providedIn: 'root'
})
export class InteractionService {

  constructor() {
  }


  private searchDataSource = new Subject<string>();
  searchData$ = this.searchDataSource.asObservable();

  private labelDataSource = new Subject<ILabel>();
  labelDataObj$ = this.labelDataSource.asObservable();

  private labelSource = new Subject<any[]>();
  labelData$ = this.labelSource.asObservable();

  sendData(value: string): void {
    this.searchDataSource.next(value);
  }

  sendObject(obj: ILabel): void {
    this.labelDataSource.next(obj);
  }

  sendList(value: any[]): void {
    this.labelSource.next(value);
  }

}
