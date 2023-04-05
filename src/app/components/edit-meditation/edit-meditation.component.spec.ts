import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditMeditationComponent } from './edit-meditation.component';

describe('EditMeditationComponent', () => {
  let component: EditMeditationComponent;
  let fixture: ComponentFixture<EditMeditationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditMeditationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditMeditationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
