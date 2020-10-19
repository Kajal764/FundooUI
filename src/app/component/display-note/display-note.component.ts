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

  // tslint:disable-next-line:typedef
  ngOnInit() {
    this.getNoteList();
  }

  openSnackBar(action): void {
    this.getPinNoteList();
    this.snackBar.open(this.message, action, {duration: 4000});
  }

  private getNoteList(): void {
    this.noteService.getList('list')
      .subscribe(data => {
          this.notes = data;
          this.message = 'Note Fetch';
          this.openSnackBar('Dismiss');
        },
        error => {
          this.message = error.error.message;
          this.openSnackBar('Dismiss');
        });
  }

  private getPinNoteList(): void {
    this.noteService.getList('pinList')
      .subscribe(data => {
          this.pinNotes = data;
        },
        error => {
          this.message = error.error.message;
          this.openSnackBar('Dismiss');
        });
  }
}
