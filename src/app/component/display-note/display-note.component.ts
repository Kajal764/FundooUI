import {Component, OnInit} from '@angular/core';
import {NoteService} from '../../service/note/note.service';

@Component({
  selector: 'app-display-note',
  templateUrl: './display-note.component.html',
  styleUrls: ['./display-note.component.scss']
})
export class DisplayNoteComponent implements OnInit {

  public flag = true;

  public notes = [];

  constructor(private noteService: NoteService) {
  }

  ngOnInit(): void {
    this.noteService.getNotes()
      .subscribe(data => {
          this.notes = data;
        },
        error => error.error);
  }


}
