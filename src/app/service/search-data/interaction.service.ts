import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InteractionService {

  private searchDataSource = new Subject<string>();
  searchData$ = this.searchDataSource.asObservable();

  private labelSource = new Subject<any[]>();
  labelData$ = this.labelSource.asObservable();

  constructor() {
  }

  sendData(value: string): void {
    this.searchDataSource.next(value);
  }

  sendList(value: any[]): void {
    this.labelSource.next(value);
  }

}
