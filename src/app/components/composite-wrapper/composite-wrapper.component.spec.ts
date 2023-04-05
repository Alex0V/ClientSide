import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompositeWrapperComponent } from './composite-wrapper.component';

describe('CompositeWrapperComponent', () => {
  let component: CompositeWrapperComponent;
  let fixture: ComponentFixture<CompositeWrapperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompositeWrapperComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompositeWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
