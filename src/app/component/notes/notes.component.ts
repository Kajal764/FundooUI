import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})
export class NotesComponent implements OnInit {
  public flag: boolean = true;
  public isPin: boolean = false;

  constructor() {
  }

  ngOnInit(): void {
  }

  // tslint:disable-next-line:typedef
  addNote() {
    this.flag = !this.flag;
  }

  notePin() {
    this.isPin ? this.isPin = false : this.isPin = true;
  }
}
