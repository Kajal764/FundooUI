import {Component, OnInit, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {INote} from '../note/note';

@Component({
  selector: 'app-update-note',
  templateUrl: './update-note.component.html',
  styleUrls: ['./update-note.component.scss']
})
export class UpdateNoteComponent implements OnInit {
  isPin = false;

  constructor(@Inject(MAT_DIALOG_DATA) public note: INote) {
  }

  ngOnInit(): void {
  }

  notePin(): void {
    this.isPin ? this.isPin = false : this.isPin = true;
  }

}
