import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NoteService} from '../../service/note/note.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {InteractionService} from '../../service/search-data/interaction.service';
import {LabelService} from '../../service/label/label.service';
import {ILabel} from '../create-label/ILabel';
import {MatCheckboxChange} from '@angular/material/checkbox';

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
  onAdd = new EventEmitter();

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
  public labelList: ILabel[];

  constructor(private noteService: NoteService,
              private snackBar: MatSnackBar,
              private interactionService: InteractionService,
              private labelService: LabelService) {
  }

  ngOnInit(): void {
    this.getSubscribeList();
    this.getLabelList();

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

  mapLabel(matCheckboxChange: MatCheckboxChange, labelData: ILabel, note: any): void {
    if (matCheckboxChange.checked) {
      const data = {
        label_Id: labelData.label_Id,
        note_Id: note.note_Id,
        labelName: labelData.labelName
      };
      this.labelService.postLabel(data, 'noteLabel')
        .subscribe(response => {
          this.responseData = response;
          this.getList.emit();
          this.getPinList.emit();
          this.getArchiveList.emit();
          this.onAdd.emit();
          this.openSnackBar('Dismiss');
        }, error => {
          this.responseData = error.error;
          this.openSnackBar('Dismiss');
        });
    }
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

}
