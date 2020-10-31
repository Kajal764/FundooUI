import {AfterViewInit, Component, OnInit} from '@angular/core';
import {InteractionService} from '../../service/search-data/interaction.service';
import {ILabel} from '../create-label/ILabel';
import {NoteService} from '../../service/note/note.service';
import {INote} from '../note/note';
import {NgxSpinnerService} from 'ngx-spinner';

@Component({
  selector: 'app-map-label-note',
  templateUrl: './map-label-note.component.html',
  styleUrls: ['./map-label-note.component.scss']
})
export class MapLabelNoteComponent implements OnInit {

  public label: ILabel;
  public noteList: INote[];
  private message: any;
  noteType = 'note';
  isNotePresent = false;

  constructor(private interactionService: InteractionService,
              private noteService: NoteService) {
  }

  ngOnInit(): void {
    this.getSubscribeList();
  }

  private getSubscribeList(): void {
    this.interactionService.labelDataObj$
      .subscribe(data => {
        this.label = data;
        this.getNoteList(data);
      });
  }

  private getNoteList(label: ILabel): void {
    const url = `mapNote/${label.label_Id}`;
    this.noteService.getList(url)
      .subscribe(data => {
          this.noteList = data;
          if (this.noteList.length > 0) {
            this.isNotePresent = true;
          }
        },
        error => {
          this.message = error.error.message;
        });
  }
}
