import {Component, Input, OnInit} from '@angular/core';
import {INote} from './note';
import {MatDialog} from '@angular/material/dialog';
import {UpdateNoteComponent} from '../update-note/update-note.component';
import {NoteService} from '../../service/note/note.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.scss']
})
export class NoteComponent implements OnInit {

  @Input() public note: INote;

  public isPin = false;
  // tslint:disable-next-line:ban-types
  private responseData: any;

  constructor(public dialog: MatDialog,
              private noteService: NoteService,
              private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
  }

  notePin(): void {
    this.isPin ? this.isPin = false : this.isPin = true;
  }

  openNotePopup(): void {
    const dialogRef = this.dialog.open(UpdateNoteComponent,
      {width: '500px', data: this.note});

    dialogRef.afterClosed().subscribe(data => {
      const updatedNote = {
        note_id: data.note_Id,
        title: data.title,
        description: data.description
      };
      this.noteService.editNote(updatedNote)
        .subscribe(response => {
          this.responseData = response;
          this.openSnackBar('Dismiss');
        }, (error) => {
          this.responseData = error.error;
          this.openSnackBar('Dismiss');
        });

    });
  }

  openSnackBar(action): void {
    this.snackBar.open(this.responseData.message, action, {duration: 4000});
  }
}
