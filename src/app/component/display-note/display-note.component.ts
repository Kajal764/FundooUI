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
  private message: string;
  noteType = 'note';

  constructor(private noteService: NoteService, private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.noteService.getNotes('list')
      .subscribe(data => {
          this.notes = data;
          console.log(this.notes);
          this.message = 'Note Fetch';
          this.openSnackBar('Dismiss');
        },
        error => {
          this.message = error.error.message;
          this.openSnackBar('Dismiss');
        });
  }

  openSnackBar(action): void {
    this.snackBar.open(this.message, action, {duration: 4000});
  }

}
