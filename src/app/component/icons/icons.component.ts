import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {NoteService} from '../../service/note/note.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-icons',
  templateUrl: './icons.component.html',
  styleUrls: ['./icons.component.scss']
})

export class IconsComponent implements OnInit {

  @Output() setColor = new EventEmitter();
  @Output() getList = new EventEmitter<any>();
  @Output() getPinList = new EventEmitter<any>();
  @Output() getArchiveList = new EventEmitter<any>();
  @Input() note: any;
  @Input() noteType: any;

  private responseData: any;

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

  constructor(private noteService: NoteService, private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
  }

  deleteNote(apiCall: string): void {
    this.noteService.deleteNote(this.note.note_Id, apiCall)
      .subscribe(response => {
        this.responseData = response;
        this.openSnackBar('Dismiss');
        this.getList.emit();
        this.getPinList.emit();
        this.getArchiveList.emit();
      }, error => {
        this.responseData = error.error;
        this.openSnackBar('Dismiss');
      });
  }

  openSnackBar(action): void {
    this.snackBar.open(this.responseData.message, action, {duration: 4000});
  }

  colorEdit(color: string, note: any): void {
    this.setColor.emit(color);
    const data = {
      note_id: note.note_Id,
      color
    };
    this.noteService.updateColor(data)
      .subscribe(response => {
        this.responseData = response;
        this.openSnackBar('Dismiss');
      }, error => {
        this.responseData = error.error;
        this.openSnackBar('Dismiss');
      });
  }
}
