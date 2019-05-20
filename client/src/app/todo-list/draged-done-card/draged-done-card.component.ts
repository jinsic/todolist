import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-draged-done-card',
  templateUrl: './draged-done-card.component.html',
  styleUrls: ['./draged-done-card.component.scss'],
  inputs: ["main"],
})
export class DragedDoneCardComponent implements OnInit {
  @ViewChild("card") card;
  @Output() setTodo = new EventEmitter();
  title = "";
  description = "";
  dueDate = "";
  dueTime = "";
  isDrag = false;
  todo;
  x;
  y;
  main;
  isCardOver = false;
  isCardOutter = false;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    
  }
  setCard(todo, top, x, y) {
    this.card.nativeElement.style.top = top +"px";
    this.card.nativeElement.style.left = window.innerWidth - 320 +"px";
    this.todo = todo;
    this.title = todo.title;
    this.isDrag = true;
    this.x = x;
    this.y = y;
  }
  setVisibility(visibility: string) {
    this.card.nativeElement.style.visibility = visibility;
  }
  mousemove(event) {
    if(this.isDrag) {
      this.card.nativeElement.style.top 
        = this.card.nativeElement.getBoundingClientRect().top + event.y - this.y +"px";
      this.card.nativeElement.style.left
        = this.card.nativeElement.getBoundingClientRect().left + event.x - this.x +"px";
      this.x = event.x;
      this.y = event.y;
      if(window.innerWidth - this.card.nativeElement.getBoundingClientRect().left - 300 > 320) {
        if(!this.isCardOutter) {
          this.isCardOutter = true;
          this.description = this.todo.description;
          this.dueDate = this.todo.dueDate;
          this.dueTime = this.todo.dueTime;
        }
      } else {
        if(this.isCardOutter) {
          this.isCardOutter = false;
          this.description = "";
          this.dueDate = "";
          this.dueTime = "";
        }
      }
      let cardRect = {
        "left" : this.card.nativeElement.getBoundingClientRect().left,
        "top" : this.card.nativeElement.getBoundingClientRect().top,
        "right" : this.card.nativeElement.offsetWidth + this.card.nativeElement.getBoundingClientRect().left,
        "bottom" : this.card.nativeElement.offsetHeight + this.card.nativeElement.getBoundingClientRect().top
      };
      let trashRect = {
        "left" : this.main.trash.nativeElement.offsetLeft,
        "top" : this.main.trash.nativeElement.offsetTop,
        "right" : this.main.trash.nativeElement.offsetLeft + 100,
        "bottom" : this.main.trash.nativeElement.offsetTop + 100
      };
      if(cardRect.right > trashRect.left && cardRect.bottom > trashRect.top
        && cardRect.left < trashRect.right && cardRect.top < trashRect.bottom) {
        if(!this.isCardOver) {
          this.isCardOver = true;
          this.main.openTrash();
        }
      } else {
        if(this.isCardOver) {
          this.isCardOver = false;
          this.main.closeTrash();
        }
      }
    }
    return true;
  }
  mouseup(event) {
    this.isDrag = false;
    if(this.isCardOver) {
      let card = {
        "todo_id": this.todo.id,
        "email": sessionStorage["email"]
      };
      this.http.post("http://3.18.225.47:5000/todo/delete", card).subscribe(result => {
          this.card.nativeElement.style["visibility"] = "collapse";
          this.main.getTodo();
          this.main.closeTrash();
          this.isCardOver = false;
        }, err => {

        });
    } else {
      if(this.isCardOutter) {
        let todo = {
          "email": sessionStorage.email,
          "todo_id": this.todo.id,
          "left" : this.card.nativeElement.getBoundingClientRect().left,
          "top" : this.card.nativeElement.getBoundingClientRect().top,
          "z_index": this.main.maxzIndex,
        }
        this.http.post("http://3.18.225.47:5000/todo/set-todo", todo).subscribe(result => {
          this.main.maxzIndex += 1;
          this.main.getTodo();
          this.isCardOutter = false;
        }, err => {
        });
      }
    }
  }
}
