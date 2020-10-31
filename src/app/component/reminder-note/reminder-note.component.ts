import {Component, OnInit} from '@angular/core';
import {NoteService} from '../../service/note/note.service';
import {INote} from '../note/note';
import {MatSnackBar} from '@angular/material/snack-bar';
import {NgxSpinnerService} from 'ngx-spinner';

@Component({
  selector: 'app-reminder-note',
  templateUrl: './reminder-note.component.html',
  styleUrls: ['./reminder-note.component.scss']
})
export class ReminderNoteComponent implements OnInit {
  public reminderNoteList: INote[];
  private message: string;
  noteType = 'note';

  constructor(private noteService: NoteService,
              private snackBar: MatSnackBar,
              private spinner: NgxSpinnerService) {
  }

  ngOnInit(): void {
    this.remainderNote();
  }


  private remainderNote(): void {
    this.spinner.show();
    this.noteService.getList('reminder')
      .subscribe(data => {
          this.reminderNoteList = data;
          console.log(this.reminderNoteList);
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

}
