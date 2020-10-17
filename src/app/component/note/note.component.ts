import {Component, OnInit} from '@angular/core';
import {HttpclientService} from '../../service/http/httpclient.service';
import {NoteService} from '../../service/note/note.service';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.scss']
})
export class NoteComponent implements OnInit {

  public flag: boolean = true;
  public isPin: boolean = false;

  public notes = [];

  constructor(private noteService: NoteService) {
  }

  ngOnInit(): void {
    this.noteService.getNotes()
      .subscribe(data => this.notes = data,
        error => error.error);
  }

  notePin(): void {
    this.isPin ? this.isPin = false : this.isPin = true;
  }

}
