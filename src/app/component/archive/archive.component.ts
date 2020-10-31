import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {NoteService} from '../../service/note/note.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {INote} from '../note/note';
import {NgxSpinnerService} from 'ngx-spinner';

@Component({
  selector: 'app-archive',
  templateUrl: './archive.component.html',
  styleUrls: ['./archive.component.scss']
})
export class ArchiveComponent implements OnInit {

  @Output() public getNoteList = new EventEmitter<any>();
  public archiveNoteList: INote[];
  private message: string;
  noteType = 'archive';

  constructor(private noteService: NoteService,
              private snackBar: MatSnackBar,
              private spinner: NgxSpinnerService) {
  }

  ngOnInit(): void {
    this.archiveNote();
  }

  private archiveNote(): void {
    this.spinner.show();
    this.noteService.getList('archiveList')
      .subscribe(data => {
          this.archiveNoteList = data;
          this.spinner.hide();
          this.message = 'Note Fetch';
          this.snackBar.open(this.message, 'Dismiss', {duration: 4000});
        },
        error => {
          this.message = error.error.message;
          this.spinner.hide();
          this.snackBar.open(this.message, 'Dismiss', {duration: 4000});
        });
  }
}
