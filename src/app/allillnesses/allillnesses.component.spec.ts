import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllillnessesComponent } from './allillnesses.component';

describe('AllillnessesComponent', () => {
  let component: AllillnessesComponent;
  let fixture: ComponentFixture<AllillnessesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllillnessesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllillnessesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
