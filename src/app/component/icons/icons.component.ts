import {Component, Input, OnInit} from '@angular/core';
import {NoteService} from '../../service/note/note.service';
import {MatDialog} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';


@Component({
  selector: 'app-icons',
  templateUrl: './icons.component.html',
  styleUrls: ['./icons.component.scss']
})
export class IconsComponent implements OnInit {

  @Input() note: any;
  private responseData: any;

  constructor(private noteService: NoteService, private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
  }

  deleteNote(): void {
    this.noteService.deleteNote(this.note.note_Id)
      .subscribe(response => {
        this.responseData = response;
        this.openSnackBar('Dismiss');
      }, error => {
        this.responseData = error.error;
        this.openSnackBar('Dismiss');
      });

  }


  openSnackBar(action): void {
    this.snackBar.open(this.responseData.message, action, {duration: 4000});
  }
}
