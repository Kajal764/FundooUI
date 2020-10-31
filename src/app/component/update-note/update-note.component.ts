import {Component, OnInit, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {INote} from '../note/note';
import {NoteService} from '../../service/note/note.service';
import {NgxSpinnerService} from 'ngx-spinner';

@Component({
  selector: 'app-update-note',
  templateUrl: './update-note.component.html',
  styleUrls: ['./update-note.component.scss']
})
export class UpdateNoteComponent implements OnInit {
  isPin = false;
  public loginUser: string;
  public userCollabList: [{ id: number; firstName: string; lastName: string; email: string; varified: boolean }];

  todaydate = new Date();
  tomorrow = new Date(
    this.todaydate.getFullYear(),
    this.todaydate.getMonth(),
    this.todaydate.getDate() + 1,
    0,
    0,
    0,
    0
  );
  private responseData: any;

  constructor(@Inject(MAT_DIALOG_DATA) public note: INote,
              public noteService: NoteService) {
  }

  ngOnInit(): void {
    this.loginUser = localStorage.getItem('email');
    this.userCollabList = this.note.userList;
    this.userCollabList.reverse();

  }

  notePin(): void {
    this.isPin ? this.isPin = false : this.isPin = true;
  }

  removeMapping(noteId: number, labelId: number): void {

  }

  removeReminder(noteId: number): void {
    this.noteService.deleteReminder(noteId)
      .subscribe(response => {
        this.responseData = response;
      }, error => {
        this.responseData = error.error;
      });
  }
}
