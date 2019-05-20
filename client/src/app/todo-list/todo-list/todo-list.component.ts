import { Component, OnInit, Input, ViewChild } from '@angular/core';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
  inputs: ["todos", "main"],
})
export class TodoListComponent implements OnInit {
  todos;
  onDrag: boolean = false;
  selectedIndex: number;
  main;
  @ViewChild("doneCard") doneCard;
  
  constructor() { }

  ngOnInit() {
  }
  mouseDownCard(event) {
    this.doneCard.setVisibility("visible");
    this.selectedIndex = event.index;
    this.onDrag = true;
    this.doneCard.setCard(event.todo, event.top, event.x, event.y);
  }
  mouseOnCard(event) {
    let temp = this.todos[this.selectedIndex];
    this.todos[this.selectedIndex] = this.todos[event.index];
    this.todos[event.index] = temp;
    if(event.index > this.selectedIndex) {
      this.selectedIndex += 1;
    } else {
      this.selectedIndex -= 1;
    }
  }
  mouseUpCard() {
    this.doneCard.setVisibility("collapse");
    this.onDrag = false;
  }

}
