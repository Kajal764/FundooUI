import {Component, OnInit} from '@angular/core';
import {NoteService} from '../../service/note/note.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {INote} from '../note/note';

@Component({
  selector: 'app-archive',
  templateUrl: './archive.component.html',
  styleUrls: ['./archive.component.scss']
})
export class ArchiveComponent implements OnInit {
  public archiveNoteList: INote[];
  private message: string;
  noteType = 'archive';

  constructor(private noteService: NoteService, private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.archiveNote();
  }

  private archiveNote(): void {
    this.noteService.getList('archiveList')
      .subscribe(data => {
          this.archiveNoteList = data;
          console.log(this.archiveNoteList);
          this.message = 'Note Fetch';
          this.snackBar.open(this.message, 'Dismiss', {duration: 4000});
        },
        error => {
          this.message = error.error.message;
          this.snackBar.open(this.message, 'Dismiss', {duration: 4000});
        });
  }
}
