import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReminderNoteComponent } from './reminder-note.component';

describe('ReminderNoteComponent', () => {
  let component: ReminderNoteComponent;
  let fixture: ComponentFixture<ReminderNoteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReminderNoteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReminderNoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
