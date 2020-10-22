import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-display-note',
  templateUrl: './display-note.component.html',
  styleUrls: ['./display-note.component.scss']
})
export class DisplayNoteComponent implements OnInit {

  @Output() public getNoteList = new EventEmitter<any>();
  @Output() public getPinList = new EventEmitter<any>();
  @Input() public notes = [];
  @Input() public pinNotes = [];

  @Input() public isOtherNote;
  @Input() public isPinNote;


  public flag = true;

  noteType = 'note';

  constructor() {
  }

  // tslint:disable-next-line:typedef
  ngOnInit() {

  }

}
