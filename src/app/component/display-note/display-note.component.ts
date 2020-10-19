import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NoteService} from '../../service/note/note.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-display-note',
  templateUrl: './display-note.component.html',
  styleUrls: ['./display-note.component.scss']
})
export class DisplayNoteComponent implements OnInit {

  @Output() public getNoteList = new EventEmitter<any>();
  @Input() public notes = [];

  public flag = true;
  public pinNotes = [];

  private message: string;
  noteType = 'note';


  constructor(private noteService: NoteService, private snackBar: MatSnackBar) {
  }

  // tslint:disable-next-line:typedef
  ngOnInit() {

  }

  openSnackBar(action): void {
    this.getPinNoteList();
    this.snackBar.open(this.message, action, {duration: 4000});
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
