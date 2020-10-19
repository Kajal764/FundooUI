import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {NoteService} from '../../service/note/note.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-create-note',
  templateUrl: './create-note.component.html',
  styleUrls: ['./create-note.component.scss']
})
export class CreateNoteComponent implements OnInit {

  @Output()
  public getNoteList = new EventEmitter<any>();

  public flag = true;
  public isPin = false;
  noteDesc: any;
  noteTitle: any;

  private responseData: any = {
    statusCode: Number,
    message: String
  };

  constructor(private noteService: NoteService, private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
  }

  // tslint:disable-next-line:typedef


  addNote(): void {
    this.flag = !this.flag;
  }

  notePin(): void {
    this.isPin ? this.isPin = false : this.isPin = true;
  }

  // tslint:disable-next-line:typedef
  createNote() {
    const data = {
      note_id: 0,
      title: this.noteTitle,
      description: this.noteDesc
    };
    this.noteService.createNote(data)
      .subscribe(response => {
        this.responseData = response;
        this.openSnackBar('Dismiss');
        this.getNoteList.emit();
      }, (error) => {
        this.responseData = error.error;
        this.openSnackBar('Dismiss');
      });
    this.noteTitle = '';
    this.noteDesc = '';

  }

  openSnackBar(action): void {
    this.flag = true;
    this.snackBar.open(JSON.stringify(this.responseData.message), action, {duration: 4000});
  }

}
