import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapLabelNoteComponent } from './map-label-note.component';

describe('MapLabelNoteComponent', () => {
  let component: MapLabelNoteComponent;
  let fixture: ComponentFixture<MapLabelNoteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MapLabelNoteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MapLabelNoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
