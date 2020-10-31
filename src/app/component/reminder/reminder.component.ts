import {Component, Input, OnInit, EventEmitter, Output} from '@angular/core';
import {AmazingTimePickerService} from 'amazing-time-picker';
import {NoteService} from '../../service/note/note.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-reminder',
  templateUrl: './reminder.component.html',
  styleUrls: ['./reminder.component.scss']
})
export class ReminderComponent implements OnInit {

  @Input() note: any;
  @Input() noteType: string;
  @Output() getList = new EventEmitter<any>();
  @Output() getPinList = new EventEmitter<any>();
  @Output() getArchiveList = new EventEmitter<any>();
  @Output() getDateAndTime = new EventEmitter();

  responseData: any;
  reminderShow = true;
  private data: { note_Id: any; remainder: any };
  time: any;
  currentDate = new Date();
  defaultTime: Date = new Date();
  public isEdit = false;

  reminderList = [
    {day: 'Today', time: '8:00 PM', dayCount: 0, timeCount: '20'},
    {day: 'Tomorrow', time: '8:00 AM', dayCount: 1, timeCount: '08'},
    {day: 'Next week', time: '8:00 AM', dayCount: 7, timeCount: '08'},
  ];
  public timeSet = '10:00';

  constructor(private noteService: NoteService,
              private snackBar: MatSnackBar,
              private atp: AmazingTimePickerService) {
  }

  ngOnInit(): void {
  }

  open(): void {
    const amazingTimePicker = this.atp.open({
      time: this.timeSet,
      theme: 'dark',
      arrowStyle: {
        background: 'red',
        color: 'white'
      }
    });
    amazingTimePicker.afterClose().subscribe(time => {
      this.timeSet = time;
      this.isEdit = true;
      const hours = Number(this.timeSet.slice(0, 2));
      const minute = Number(this.timeSet.slice(3, 5));

      const updateDate = new Date(
        this.defaultTime.getFullYear(),
        this.defaultTime.getMonth(),
        this.defaultTime.getDate(),
        hours,
        minute,
        0,
        0
      );
      this.getDateAndTime.emit(updateDate);
      if (this.noteType !== 'reminder') {
        this.data = {
          note_Id: this.note.note_Id,
          remainder: updateDate
        };
        // this.saveReminder();
      }
    });
  }

  // tslint:disable-next-line:max-line-length
  setReminder(reminder: { timeCount: number; dayCount: number; time: string; day: string } | { timeCount: number; dayCount: number; time: string; day: string }): void {
    this.isEdit = true;
    const updateDate = new Date(
      this.currentDate.getFullYear(),
      this.currentDate.getMonth(),
      this.currentDate.getDate() + reminder.dayCount,
      reminder.timeCount,
      this.currentDate.getMinutes(),
      0,
      0
    );
    this.getDateAndTime.emit(updateDate);
    if (this.noteType !== 'reminder') {
      this.data = {
        note_Id: this.note.note_Id,
        remainder: updateDate
      };
      this.saveReminder();
    }
  }

  openSnackBar(action): void {
    this.snackBar.open(JSON.stringify(this.responseData.message), action, {duration: 4000});
  }

  toggle(): void {
    this.reminderShow = !this.reminderShow;
  }

  saveReminder(): void {
    if (this.isEdit && this.noteType !== 'reminder' || this.defaultTime !== new Date()) {
      this.noteService.putData(this.data, 'reminder')
        .subscribe(response => {
          this.responseData = response;
          this.getList.emit();
          this.getPinList.emit();
          this.getArchiveList.emit();
          this.openSnackBar('Dismiss');
        }, (error) => {
          this.responseData = error.error;
          this.openSnackBar('Dismiss');
        });
    }
  }


}
