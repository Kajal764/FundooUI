import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoteHomePageComponent } from './note-home-page.component';

describe('NoteHomePageComponent', () => {
  let component: NoteHomePageComponent;
  let fixture: ComponentFixture<NoteHomePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NoteHomePageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NoteHomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
