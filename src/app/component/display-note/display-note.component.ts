import {Component, OnInit} from '@angular/core';
import {NoteService} from '../../service/note/note.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-display-note',
  templateUrl: './display-note.component.html',
  styleUrls: ['./display-note.component.scss']
})
export class DisplayNoteComponent implements OnInit {

  public flag = true;

  public notes = [];


  constructor(private noteService: NoteService, private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.noteService.getNotes()
      .subscribe(data => {
          this.notes = data;
          this.openSnackBar('Dismiss');
        },
        error => error.error);
  }

  openSnackBar(action): void {
    let message: string;
    if (this.notes.length > 1) {
      message = 'Note Fetch';
    } else {
      message = 'Note not present';
    }
    this.snackBar.open(message, action, {duration: 4000});
  }

}
