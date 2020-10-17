import {Component, Input, OnInit} from '@angular/core';
import {INote} from './note';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.scss']
})
export class NoteComponent implements OnInit {

  @Input() public note: INote ;

  public isPin = false;

  constructor() {
  }

  ngOnInit(): void {
  }

  notePin(): void {
    this.isPin ? this.isPin = false : this.isPin = true;
  }


}
