import {AfterViewInit, Component, OnInit} from '@angular/core';
import {NoteService} from '../../service/note/note.service';
import {INote} from '../note/note';

@Component({
  selector: 'app-note-home-page',
  templateUrl: './note-home-page.component.html',
  styleUrls: ['./note-home-page.component.scss']
})
export class NoteHomePageComponent implements OnInit {

  public noteList = [];
  private message: string;
  noteType = 'note';
  public pinNotes: INote[];

  constructor(private noteService: NoteService) {
  }

  ngOnInit(): void {
    this.getAllNote();
    this.getPinNoteList();
  }

  public getAllNote(): void {
    this.noteService.getList('list')
      .subscribe(data => {
          this.noteList = data;
          this.noteList.reverse();
        },
        error => {
          this.message = error.error.message;
        });
  }


  public getPinNoteList(): void {
    this.noteService.getList('pinList')
      .subscribe(data => {
          this.pinNotes = data;
          console.log(this.pinNotes);
        },
        error => {
          this.message = error.error.message;
        });
  }

}
