import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddillnessComponent } from './addillness.component';

describe('AddillnessComponent', () => {
  let component: AddillnessComponent;
  let fixture: ComponentFixture<AddillnessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddillnessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddillnessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
