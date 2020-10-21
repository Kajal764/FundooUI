import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {NoteService} from '../../service/note/note.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {InteractionService} from '../../service/search-data/interaction.service';

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

  constructor(private noteService: NoteService,
              private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
  }

  // tslint:disable-next-line:typedef

  addNote(): void {
    this.flag = !this.flag;
  }

  notePin(): void {
    this.pin ? this.pin = false : this.pin = true;
  }

  // tslint:disable-next-line:typedef
  createNote() {
    const data = {
      note_id: 0,
      title: this.noteTitle,
      description: this.noteDesc,
      color: this.color,
      archive: this.archive,
      pin: this.pin
    };
    this.noteService.createNote(data)
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
}
