import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LastAnswersComponent } from './last-answers.component';

describe('LastAnswersComponent', () => {
  let component: LastAnswersComponent;
  let fixture: ComponentFixture<LastAnswersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LastAnswersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LastAnswersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
