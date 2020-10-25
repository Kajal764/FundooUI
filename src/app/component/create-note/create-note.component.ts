import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {NoteService} from '../../service/note/note.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {InteractionService} from '../../service/search-data/interaction.service';
import {LabelService} from '../../service/label/label.service';
import {ILabel} from '../create-label/ILabel';
import {MatCheckboxChange} from '@angular/material/checkbox';
import {UserService} from '../../service/user/user.service';
import {IUser} from '../collaborator/IUser';

@Component({
  selector: 'app-create-note',
  templateUrl: './create-note.component.html',
  styleUrls: ['./create-note.component.scss']
})
export class CreateNoteComponent implements OnInit {

  @Output() public getNoteList = new EventEmitter<any>();
  @Output() public getPinList = new EventEmitter<any>();
  @Output() setColor = new EventEmitter();

  public flag = true;
  public pin = false;
  noteDesc: any;
  noteTitle: any;
  color = '#fff';
  public userLogin: IUser;
  isCorrect = false;
  public isFalse = false;

  colorArray = [
    [
      {color: '#fff', name: 'White'},
      {color: '#f28b82', name: 'Red'},
      {color: '#fbbc04', name: 'Orange'},
      {color: '#fff475', name: 'Yellow'}
    ],
    [
      {color: '#ccff90', name: 'Green'},
      {color: '#a7ffeb', name: 'Teal'},
      {color: '#E0EEEE', name: 'Blue'},
      {color: '#aecbfa', name: 'Darkblue'}
    ],
    [
      {color: '#d7aefb', name: 'Purple'},
      {color: '#fdcfe8', name: 'Pink'},
      {color: '#e6c9a8', name: 'Brown'},
      {color: '#e8eaed', name: 'Gray'}
    ]
  ];

  private responseData: any = {
    statusCode: Number,
    message: String
  };
  private archive = false;
  public labelList: ILabel[];
  noteType = 'reminder';
  noteLabelList: ILabel[] = [];
  public dateTime: any;
  public isCollabDiv = false;
  email: any;

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
  private userEmail: any;
  private collobUser: IUser;


  constructor(private noteService: NoteService,
              private snackBar: MatSnackBar,
              public labelService: LabelService,
              public interactionService: InteractionService,
              private userService: UserService) {
  }

  ngOnInit(): void {
    this.getLoginUser();
    this.getLabelList();
    this.getSubscribeList();
  }

  addNote(): void {
    this.flag = !this.flag;
  }

  notePin(): void {
    this.pin ? this.pin = false : this.pin = true;
  }

  // tslint:disable-next-line:typedef

  isChange(): void {
    this.isCorrect = true;
  }


  createNote(): void {
    const data = {
      note_id: 0,
      title: this.noteTitle,
      description: this.noteDesc,
      color: this.color,
      archive: this.archive,
      pin: this.pin,
      labelList: this.noteLabelList,
      remainder: this.dateTime,
      collaborateUser: this.collobUser.email
    };
    this.noteService.createNote(data, 'create')
      .subscribe(response => {
        this.responseData = response;
        this.getNoteList.emit();
        this.getPinList.emit();
        this.openSnackBar('Dismiss');
      }, (error) => {
        this.responseData = error.error;
        this.openSnackBar('Dismiss');
      });
    this.noteTitle = '';
    this.noteDesc = '';
    this.pin = false;
    this.color = '#fff';
    this.archive = false;
    this.noteLabelList = [];
    this.email = '';
    this.collobUser = null;
    this.dateTime = null;
  }

  openSnackBar(action): void {
    this.flag = true;
    this.snackBar.open(JSON.stringify(this.responseData.message), action, {duration: 4000});
  }

  colorEdit(color: string): void {
    this.setColor.emit(color);
    this.color = color;
  }

  archiveNote(): void {
    this.archive ? this.archive = false : this.archive = true;
  }

  getLabelList(): void {
    this.labelService.getList()
      .subscribe(data => {
          this.labelList = data;
          this.interactionService.sendList(this.labelList);
        },
        error => {
          this.responseData = error.error;
        });
  }

  private getSubscribeList(): void {
    this.interactionService.labelData$
      .subscribe(data => {
        this.labelList = data;
      });
  }

  mapLabel(matCheckboxChange: MatCheckboxChange, labelData: ILabel): void {
    if (matCheckboxChange.checked) {
      const index = this.noteLabelList.indexOf(labelData);
      if (index === -1) {
        this.noteLabelList.push(labelData);
      }
    } else {
      const index = this.noteLabelList.indexOf(labelData);
      if (index !== -1) {
        this.noteLabelList.splice(index, 1);
      }
    }
  }

  removeMapping(label: ILabel): void {
    const index = this.noteLabelList.indexOf(label);
    if (index !== -1) {
      this.noteLabelList.splice(index, 1);
    }
  }

  getUpdatedValue(dateTime: any): void {
    this.dateTime = dateTime;
  }

  removeReminder(): void {
    this.dateTime = null;
  }


  collabFlag(): void {
    this.isCollabDiv = true;
  }

  private getLoginUser(): void {
    this.userService.getLoginUser(localStorage.getItem('email'))
      .subscribe(data => {
          this.userLogin = data;
        },
        error => {
          this.responseData = error.error;
          this.openSnackBar('Dismiss');
        });
  }

  addUser(): void {
    this.userService.getLoginUser(this.email)
      .subscribe(data => {
          this.collobUser = data;
          this.email = '';
        },
        error => {
          this.responseData = error.error;
          this.openSnackBar('Dismiss');
        });
  }

  close(): void {
    this.isCollabDiv = false;
  }

  isChangeCross(): void {
    this.isFalse = true;
  }

  removeCollabUser(): void {
    this.collobUser = null;
  }
}
