import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoListCardComponent } from './todo-list-card.component';

describe('TodoListCardComponent', () => {
  let component: TodoListCardComponent;
  let fixture: ComponentFixture<TodoListCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TodoListCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoListCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
