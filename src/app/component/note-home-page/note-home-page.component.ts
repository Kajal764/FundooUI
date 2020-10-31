import {Component, OnInit} from '@angular/core';
import {NoteService} from '../../service/note/note.service';
import {INote} from '../note/note';
import {InteractionService} from '../../service/search-data/interaction.service';
import {NgxSpinnerService} from 'ngx-spinner';

@Component({
  selector: 'app-note-home-page',
  templateUrl: './note-home-page.component.html',
  styleUrls: ['./note-home-page.component.scss']
})
export class NoteHomePageComponent implements OnInit {

  public noteList = [];
  private message: string;
  noteType = 'note';
  public pinNotes: INote[];

  public isPinNote = 0;
  public isOtherNote = 0;
  public isGridView: boolean;

  constructor(private noteService: NoteService,
              private interactionService: InteractionService,
              private spinner: NgxSpinnerService) {
  }

  ngOnInit(): void {
    this.getAllNote();
    this.getPinNoteList();
    this.gridView();
  }

  private gridView(): void {
    this.interactionService.gridData$
      .subscribe(data => {
        this.isGridView = data;
      });
  }

  public getAllNote(): void {
    this.spinner.show();
    this.noteService.getList('list')
      .subscribe(data => {
          this.noteList = data;
          this.noteList.reverse();
          this.isOtherNote = this.noteList.length;
        },
        error => {
          this.message = error.error.message;
        });
    this.spinner.hide();
  }

  public getPinNoteList(): void {
    this.spinner.show();
    this.noteService.getList('pinList')
      .subscribe(data => {
          this.pinNotes = data;
          this.isPinNote = this.pinNotes.length;
        },
        error => {
          this.message = error.error.message;
        });
    this.spinner.hide();
  }

}
