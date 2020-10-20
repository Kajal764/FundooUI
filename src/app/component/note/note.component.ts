import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {INote} from './note';
import {MatDialog} from '@angular/material/dialog';
import {UpdateNoteComponent} from '../update-note/update-note.component';
import {NoteService} from '../../service/note/note.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
    selector: 'app-note',
    templateUrl: './note.component.html',
    styleUrls: ['./note.component.scss']
})
export class NoteComponent implements OnInit {

    @Input() public note: INote;
    @Input() public noteType: string;
    @Output() getList = new EventEmitter<any>();
    @Output() getPinList = new EventEmitter<any>();
    @Output() archiveList = new EventEmitter<any>();
    private responseData: any;

    constructor(public dialog: MatDialog,
                private noteService: NoteService,
                private snackBar: MatSnackBar) {
    }

    ngOnInit(): void {
    }

    notePin(note: INote): void {
        this.noteService.deleteNote(note.note_Id, 'pinUnpin')
            .subscribe(response => {
                this.responseData = response;
                this.openSnackBar('Dismiss');
                this.getList.emit();
                this.getPinList.emit();
            }, error => {
                this.responseData = error.error;
                this.openSnackBar('Dismiss');
            });
        // this.isPin ? this.isPin = false : this.isPin = true;
    }

    openNotePopup(): void {
        const dialogRef = this.dialog.open(UpdateNoteComponent,
            {width: '500px', data: this.note});

        dialogRef.afterClosed().subscribe(data => {
            const updatedNote = {
                note_id: data.note_Id,
                title: data.title,
                description: data.description
            };
            this.noteService.editNote(updatedNote)
                .subscribe(response => {
                    this.responseData = response;
                    this.openSnackBar('Dismiss');
                    this.getList.emit();

                }, (error) => {
                    this.responseData = error.error;
                    this.openSnackBar('Dismiss');
                });

        });
    }

    openSnackBar(action): void {
        this.snackBar.open(this.responseData.message, action, {duration: 4000});
    }


    getUpdatedValue($event: any): void {
        this.note.color = $event;
    }
}
