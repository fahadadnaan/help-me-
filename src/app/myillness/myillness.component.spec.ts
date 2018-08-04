import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyillnessComponent } from './myillness.component';

describe('MyillnessComponent', () => {
  let component: MyillnessComponent;
  let fixture: ComponentFixture<MyillnessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyillnessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyillnessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
