import {Component, Inject, OnInit, EventEmitter} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {INote} from '../note/note';
import {NoteService} from '../../service/note/note.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {IUser} from './IUser';
import {NgxSpinnerService} from 'ngx-spinner';

@Component({
  selector: 'app-collaborator',
  templateUrl: './collaborator.component.html',
  styleUrls: ['./collaborator.component.scss']
})
export class CollaboratorComponent implements OnInit {

  email: any;
  isCorrect = false;
  private responseData: any;
  public collabUserList: IUser[];
  public isFalse = false;
  private loginUser: string;
  private image: string;
  public user: { id: number; firstName: string; lastName: string; email: string; varified: boolean };

  constructor(@Inject(MAT_DIALOG_DATA) public note: INote,
              private noteService: NoteService,
              private snackBar: MatSnackBar,
              private spinner: NgxSpinnerService) {
  }

  ngOnInit(): void {
    this.loginUser = localStorage.getItem('email');
    this.image = localStorage.getItem('image');
    this.note.userList.map(value => {
      if (value.email === this.loginUser) {
        this.user = value;
      }
    });
    this.getCollaboratorList();
  }

  addUser(): void {
    const data = {
      note_Id: this.note.note_Id,
      email: this.email
    };
    this.spinner.show();
    this.noteService.createNote(data, 'collaborators')
      .subscribe(response => {
        this.responseData = response;
        this.openSnackBar('Dismiss');
        this.getCollaboratorList();
        this.spinner.hide();

      }, (error) => {
        this.responseData = error.error;
        this.openSnackBar('Dismiss');
        this.spinner.hide();
      });
    this.email = '';
  }

  isChange(): void {
    this.isCorrect = true;
  }

  openSnackBar(action): void {
    this.snackBar.open(JSON.stringify(this.responseData.message), action, {duration: 3000});
  }

  public getCollaboratorList(): void {
    this.noteService.getUserList(`collaborateUser/${this.note.note_Id}`)
      .subscribe(data => {
          this.collabUserList = data.reverse();
        },
        error => {
          this.responseData = error.error;
          this.openSnackBar('Dismiss');
        });
  }

  isChangeCross(): void {
    this.isFalse = true;
  }

  removeCollabUser(user: IUser): void {
    const data = {
      note_Id: this.note.note_Id,
      email: user.email
    };

    this.noteService.removeCollabUser(data, 'removeCollaborate')
      .subscribe(response => {
        this.responseData = response;
        this.openSnackBar('Dismiss');
        this.getCollaboratorList();
      }, (error) => {
        this.responseData = error.error;
        this.openSnackBar('Dismiss');
      });
  }


}
