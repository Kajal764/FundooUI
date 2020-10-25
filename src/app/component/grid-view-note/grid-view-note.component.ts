import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-grid-view-note',
  templateUrl: './grid-view-note.component.html',
  styleUrls: ['./grid-view-note.component.scss']
})
export class GridViewNoteComponent implements OnInit {

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

  ngOnInit(): void {
  }


}
