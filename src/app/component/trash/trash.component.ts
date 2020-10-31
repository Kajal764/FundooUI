import {Component, OnInit} from '@angular/core';
import {NoteService} from '../../service/note/note.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {INote} from '../note/note';
import {NgxSpinnerService} from 'ngx-spinner';

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
              private snackBar: MatSnackBar,
              private spinner: NgxSpinnerService) {
  }

  ngOnInit(): void {
    this.trashNote();
  }

  private trashNote(): void {
    this.spinner.show();
    this.noteService.getList('trashList')
      .subscribe(data => {
          this.trashNoteList = data;
          this.message = 'Note Fetch';
          this.spinner.hide();
          this.snackBar.open(this.message, 'Dismiss', {duration: 4000});
        },
        error => {
          this.message = error.error.message;
          this.spinner.hide();
          this.snackBar.open(this.message, 'Dismiss', {duration: 4000});
        });
  }


  deleteForever(trashNote: INote): void {
    this.spinner.show();
    this.noteService.permanentDelete(trashNote.note_Id)
      .subscribe(response => {
        this.responseData = response;
        this.spinner.hide();
        this.openSnackBar('Dismiss');
        const index = this.trashNoteList.indexOf(trashNote);
        if (index !== -1) {
          this.trashNoteList.splice(index, 1);
        }
      }, error => {
        this.responseData = error.error;
        this.spinner.hide();
        this.openSnackBar('Dismiss');
      });
  }

  restoreNote(trashNote: INote): void {
    this.spinner.show();
    this.noteService.deleteNote(trashNote.note_Id, 'restoreTrashNote')
      .subscribe(response => {
        this.responseData = response;
        this.spinner.hide();
        this.openSnackBar('Dismiss');
        const index = this.trashNoteList.indexOf(trashNote);
        if (index !== -1) {
          this.trashNoteList.splice(index, 1);
        }
      }, error => {
        this.responseData = error.error;
        this.spinner.hide();
        this.openSnackBar('Dismiss');
      });
  }

  openSnackBar(action): void {
    this.snackBar.open(this.responseData.message, action, {duration: 4000});
  }
}
