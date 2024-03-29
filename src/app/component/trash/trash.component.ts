import {Component, OnInit} from '@angular/core';
import {NoteService} from '../../service/note/note.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {INote} from '../note/note';

@Component({
  selector: 'app-trash',
  templateUrl: './trash.component.html',
  styleUrls: ['./trash.component.scss']
})
export class TrashComponent implements OnInit {
  public trashNoteList: INote[];
  private message: string;
  private responseData: any;

  constructor(private noteService: NoteService,
              private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.trashNote();
  }

  private trashNote(): void {
    this.noteService.getList('trashList')
      .subscribe(data => {
          this.trashNoteList = data;
          this.message = 'Note Fetch';
          this.snackBar.open(this.message, 'Dismiss', {duration: 4000});
        },
        error => {
          this.message = error.error.message;
          this.snackBar.open(this.message, 'Dismiss', {duration: 4000});
        });
  }


  deleteForever(trashNote: INote): void {
    this.noteService.permanentDelete(trashNote.note_Id)
      .subscribe(response => {
        this.responseData = response;
        this.openSnackBar('Dismiss');
        const index = this.trashNoteList.indexOf(trashNote);
        if (index !== -1) {
          this.trashNoteList.splice(index, 1);
        }
      }, error => {
        this.responseData = error.error;
        this.openSnackBar('Dismiss');
      });
  }

  restoreNote(trashNote: INote): void {
    this.noteService.deleteNote(trashNote.note_Id, 'restoreTrashNote')
      .subscribe(response => {
        this.responseData = response;
        this.openSnackBar('Dismiss');
        const index = this.trashNoteList.indexOf(trashNote);
        if (index !== -1) {
          this.trashNoteList.splice(index, 1);
        }
      }, error => {
        this.responseData = error.error;
        this.openSnackBar('Dismiss');
      });
  }

  openSnackBar(action): void {
    this.snackBar.open(this.responseData.message, action, {duration: 4000});
  }
}
