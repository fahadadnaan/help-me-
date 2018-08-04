import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WrongeWayComponent } from './wronge-way.component';

describe('WrongeWayComponent', () => {
  let component: WrongeWayComponent;
  let fixture: ComponentFixture<WrongeWayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WrongeWayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WrongeWayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
