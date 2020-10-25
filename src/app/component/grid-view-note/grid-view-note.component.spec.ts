import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GridViewNoteComponent } from './grid-view-note.component';

describe('GridViewNoteComponent', () => {
  let component: GridViewNoteComponent;
  let fixture: ComponentFixture<GridViewNoteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GridViewNoteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GridViewNoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
