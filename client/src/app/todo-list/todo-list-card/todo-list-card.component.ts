import { Component, OnInit, Input, ViewChild, Output, EventEmitter, AfterViewChecked } from '@angular/core';

@Component({
  selector: 'app-todo-list-card',
  templateUrl: './todo-list-card.component.html',
  styleUrls: ['./todo-list-card.component.scss'],
  inputs: ["todo", "onDrag", "index"],
})
export class TodoListCardComponent implements OnInit, AfterViewChecked {
  onDrag: boolean
  todo;
  title;
  index;
  @ViewChild("card") card;
  @Output() mouseDownCard = new EventEmitter();
  @Output() mouseOnCard = new EventEmitter();
  @Output() mouseUpCard = new EventEmitter();
  isSelected: boolean = false;
  constructor() { }

  ngOnInit() {
    this.title = this.todo.title;
  }
  ngAfterViewChecked() {
    if(this.todo.dueDate != "") {
      let dates = this.todo.dueDate.split("-");
      let time = this.todo.dueTime.split(":");
      let min = time[1].split(" ");
      let hour = Number(time[0]);
      if(min[1] == "PM") {
        hour += 12;
      }
      let date = new Date(Number(dates[0]), Number(dates[1])-1, Number(dates[2]), Number(hour), Number(min[0]), 0);
      let currentDate = new Date();
      if(date < currentDate) {
        this.card.nativeElement.style.backgroundColor="#8C5873";
      }
    }
  }
  
  mousedown(event) {
    this.card.nativeElement.style.backgroundColor = "#D7C7C8";
    let card = {
      "todo": this.todo,
      "top" : this.card.nativeElement.getBoundingClientRect().top,
      "x" : event.x,
      "y" : event.y,
      "index":this.index
    }
    this.mouseDownCard.emit(card);
    this.title = "　";
    this.isSelected = true;
  }

  mousemove(event) {
    if(this.onDrag && !this.isSelected) {
      let rect = this.card.nativeElement.getBoundingClientRect();
      if(event.x < rect.right && event.y < rect.bottom - 20 && event.x > rect.left && event.y > rect.top + 20) {
        let card = {
          "todo": this.todo,
          "index": this.index
        }
        this.mouseOnCard.emit(card);
      }
    }
  }
  mouseup() {
    if(this.onDrag && this.isSelected) {
      this.mouseUpCard.emit();
      this.title = this.todo.title;
      this.onDrag = false;
      this.isSelected = false;
      this.card.nativeElement.style.backgroundColor = "#F0EEE7";
    }
  }
}
