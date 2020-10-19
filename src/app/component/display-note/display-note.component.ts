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
  public pinNotes = [];
  public notes = [];
  private message: string;
  noteType = 'note';


  constructor(private noteService: NoteService, private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.getNoteList();

  }

  openSnackBar(action): void {
    this.snackBar.open(this.message, action, {duration: 4000});
  }

  private getNoteList(): void {
    this.noteService.getNotes('list')
      .subscribe(data => {
          this.notes = data;
          this.message = 'Note Fetch';
          this.getPinNoteList();
          this.openSnackBar('Dismiss');
        },
        error => {
          this.message = error.error.message;
          this.openSnackBar('Dismiss');
        });
  }

  private getPinNoteList(): void {
    this.noteService.getNotes('pinList')
      .subscribe(data => {
          this.pinNotes = data;
        },
        error => {
          this.message = error.error.message;
          this.openSnackBar('Dismiss');
        });
  }
}
