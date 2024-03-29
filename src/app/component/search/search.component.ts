import {Component, OnInit} from '@angular/core';
import {InteractionService} from '../../service/search-data/interaction.service';
import {NoteService} from '../../service/note/note.service';
import {INote} from '../note/note';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  public searchList: INote[];
  private message: any;
  noteType = 'note';

  constructor(private interactionService: InteractionService,
              private noteService: NoteService) {
  }

  ngOnInit(): void {
    this.interactionService.searchData$
      .subscribe(data => {
        this.searchData(data);
      });
  }

  searchData(searchValue: any): void {
    const url = `searchData/${searchValue}`;
    this.noteService.getList(url)
      .subscribe(data => {
          this.searchList = data;
        },
        error => {
          this.message = error.error.message;
        });
  }

}
