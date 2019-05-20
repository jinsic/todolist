import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DragedDoneCardComponent } from './draged-done-card.component';

describe('DragedDoneCardComponent', () => {
  let component: DragedDoneCardComponent;
  let fixture: ComponentFixture<DragedDoneCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DragedDoneCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DragedDoneCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
