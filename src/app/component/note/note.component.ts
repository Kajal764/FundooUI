import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {INote} from './note';
import {MatDialog} from '@angular/material/dialog';
import {UpdateNoteComponent} from '../update-note/update-note.component';
import {NoteService} from '../../service/note/note.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {LabelService} from '../../service/label/label.service';
import {NgxSpinnerService} from 'ngx-spinner';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.scss']
})
export class NoteComponent implements OnInit {

  @Input() public note: INote;
  @Input() public noteType: string;

  @Output() getList = new EventEmitter<any>();
  @Output() getPinList = new EventEmitter<any>();
  @Output() archiveList = new EventEmitter<any>();
  private responseData: any;


  public label: INote;
  public labelList: INote [];
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
  public userCollabList: [{ id: number; firstName: string; lastName: string; email: string; varified: boolean }];
  private listUser: [{ id: number; firstName: string; lastName: string; email: string; varified: boolean }];
  private loginUser: string;

  constructor(public dialog: MatDialog,
              private noteService: NoteService,
              private snackBar: MatSnackBar,
              private labelService: LabelService,
              private spinner: NgxSpinnerService) {
  }

  ngOnInit(): void {
    this.loginUser = localStorage.getItem('email');
    this.userCollabList = this.note.userList;
    this.userCollabList.reverse();
  }


  notePin(note: INote): void {
    this.spinner.show();
    this.noteService.deleteNote(note.note_Id, 'pinUnpin')
      .subscribe(response => {
        this.responseData = response;
        this.spinner.hide();
        this.openSnackBar('Dismiss');
        this.getList.emit();
        this.getPinList.emit();
      }, error => {
        this.responseData = error.error;
        this.spinner.hide();
        this.openSnackBar('Dismiss');
      });
  }

  openNotePopup(): void {
    const dialogRef = this.dialog.open(UpdateNoteComponent,
      {width: '500px', panelClass: 'custom-box', data: this.note});

    dialogRef.afterClosed().subscribe(data => {
      this.spinner.show();
      const updatedNote = {
        note_id: data.note_Id,
        title: data.title,
        description: data.description
      };
      this.noteService.editNote(updatedNote)
        .subscribe(response => {
          this.responseData = response;
          this.spinner.hide();
          this.openSnackBar('Dismiss');
          this.getList.emit();
          this.getPinList.emit();
          this.archiveList.emit();

        }, (error) => {
          this.responseData = error.error;
          this.spinner.hide();
          this.openSnackBar('Dismiss');
        });
    });
  }

  openSnackBar(action): void {
    this.snackBar.open(this.responseData.message, action, {duration: 4000});
  }

  getUpdatedValue($event: any): void {
    this.note.color = $event;
  }

  removeMapping(noteId: number, labelId: number): void {
    this.spinner.show();
    const data = {
      note_Id: noteId,
      label_Id: labelId
    };
    this.labelService.postLabel(data, 'removeLabel')
      .subscribe(response => {
        this.responseData = response;
        this.getList.emit();
        this.getPinList.emit();
        this.archiveList.emit();
        this.spinner.hide();
        this.openSnackBar('Dismiss');
      }, error => {
        this.responseData = error.error;
        this.spinner.hide();
        this.openSnackBar('Dismiss');
      });
  }

  removeReminder(noteId: number): void {
    this.spinner.show();
    this.noteService.deleteReminder(noteId)
      .subscribe(response => {
        this.responseData = response;
        this.getList.emit();
        this.getPinList.emit();
        this.archiveList.emit();
        this.spinner.hide();
        this.openSnackBar('Dismiss');
      }, error => {
        this.responseData = error.error;
        this.spinner.hide();
        this.openSnackBar('Dismiss');
      });
  }
}
