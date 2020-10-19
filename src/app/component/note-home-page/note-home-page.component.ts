import {Component, OnInit} from '@angular/core';
import {NoteService} from '../../service/note/note.service';

@Component({
  selector: 'app-note-home-page',
  templateUrl: './note-home-page.component.html',
  styleUrls: ['./note-home-page.component.scss']
})
export class NoteHomePageComponent implements OnInit {

  public noteList = [];
  private message: string;
  noteType = 'note';

  constructor(private noteService: NoteService) {
  }

  ngOnInit(): void {
    this.getAllNote();
  }

  public getAllNote(): void {
    this.noteService.getList('list')
      .subscribe(data => {
          this.noteList = data;
          this.noteList.reverse();
          console.log(this.noteList);
        },
        error => {
          this.message = error.error.message;
        });
  }

}
