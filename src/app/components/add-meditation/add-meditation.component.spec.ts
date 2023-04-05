import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMeditationComponent } from './add-meditation.component';

describe('AddMeditationComponent', () => {
  let component: AddMeditationComponent;
  let fixture: ComponentFixture<AddMeditationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddMeditationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddMeditationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
