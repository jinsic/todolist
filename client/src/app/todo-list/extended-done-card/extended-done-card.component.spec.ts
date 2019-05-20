import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExtendedDoneCardComponent } from './extended-done-card.component';

describe('ExtendedDoneCardComponent', () => {
  let component: ExtendedDoneCardComponent;
  let fixture: ComponentFixture<ExtendedDoneCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExtendedDoneCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExtendedDoneCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
