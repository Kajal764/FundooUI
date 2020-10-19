import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {FormControl} from '@angular/forms';
import {debounceTime, distinctUntilChanged, startWith} from 'rxjs/operators';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  @Output() search = new EventEmitter<string>();
  searchField: FormControl;

  constructor() {
  }

  ngOnInit(): void {
    this.searchField = new FormControl();
    this.searchField.valueChanges.pipe(debounceTime[250],
      distinctUntilChanged(), startWith(''))
      .subscribe(data => {
        // @ts-ignore
        return this.search.emit(data);
      });
  }

}
