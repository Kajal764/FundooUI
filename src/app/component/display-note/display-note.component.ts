import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import Masonry from 'masonry-layout';

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
    window.onload = () => {
      const grid = document.querySelector('.grid');
      const gridNote = document.querySelector('.grid-note');

      const masonry = new Masonry(grid, {
        itemSelector: '.grid-item',
        gutter: 10,
        column: 3
      });
      const masonry1 = new Masonry(gridNote, {
        itemSelector: '.grid-item-note',
        gutter: 10,
        column: 3
      });
    };

  }


}

