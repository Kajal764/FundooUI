import {Component, Inject, OnInit, EventEmitter} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {INote} from '../note/note';
import {NoteService} from '../../service/note/note.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {IUser} from './IUser';

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
  private isFalse = false;
  public list: [{ id: number; firstName: string; lastName: string; email: string; varified: boolean }];
  private loginUser: string;

  public user: IUser;

  constructor(@Inject(MAT_DIALOG_DATA) public note: INote,
              private noteService: NoteService,
              private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.loginUser = localStorage.getItem('email');
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
    this.noteService.createNote(data, 'collaborators')
      .subscribe(response => {
        this.responseData = response;
        this.openSnackBar('Dismiss');
        this.getCollaboratorList();
      }, (error) => {
        this.responseData = error.error;
        this.openSnackBar('Dismiss');
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