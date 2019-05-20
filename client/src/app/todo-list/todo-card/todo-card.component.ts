import { Component, OnInit, ViewChild, Input, ElementRef, Output, EventEmitter, AfterViewChecked } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-todo-card',
  templateUrl: './todo-card.component.html',
  styleUrls: ['./todo-card.component.scss'],
  inputs:["title", "description", "dueDate", "index", "dueTime"
    , "left", "top", "todoId", "maxzIndex", "trash"],
})
export class TodoCardComponent implements OnInit, AfterViewChecked {
  date;
  title: string;
  description: string;
  dueDate: string;
  dueTime: string;
  descriptionTemp: string;
  dueDateTemp: string;
  dueTimeTemp: string;
  top: number;
  left: number;
  todoId: number;
  index: number;
  x: number;
  y: number;
  pre_x: number;
  pre_y: number;
  isDown: boolean = false;
  maxzIndex: number;
  extendedCardVisibility = "collapse";
  extendedCardTop: number;
  extendedCardLeft: number;
  @ViewChild("extendedCard") extendedCard;
  @ViewChild("card") card;
  @ViewChild("deadline") deadline;
  @ViewChild("timePicker") timePicker;
  isCardOver:boolean = false;
  isCardOnDone:boolean = false;
  trash;
  @Output() doneCard = new EventEmitter();

  constructor(private http: HttpClient, private element: ElementRef) { }

  ngOnInit() {
  }
  ngAfterViewChecked() {
    if(this.dueDate != "") {
      let dates = this.dueDate.split("-");
      let time = this.dueTime.split(":");
      let min = time[1].split(" ");
      let hour = Number(time[0]);
      if(min[1] == "PM") {
        hour += 12;
      }
      let date = new Date(Number(dates[0]), Number(dates[1])-1, Number(dates[2]), Number(hour), Number(min[0]), 0);
      let currentDate = new Date();
      if(date < currentDate) {
        this.card.nativeElement.style.backgroundColor="#8C5873";
        this.deadline.nativeElement.style.color="#FF0000";
      }
    }
  }

  deleteCard() {
    let card = {
      "todo_id": this.todoId,
      "email": sessionStorage["email"]
    };
    this.http.post("http://3.18.225.47:5000/todo/delete", card).subscribe(result => {
      this.trash.src = "assets/images/Trash.png";
      this.element.nativeElement.style["visibility"] = "collapse";
    }, err => {

    });
  }

  mousedown(event) {
    this.index = this.maxzIndex;
    event.stopPropagation();
    this.x = event.x;
    this.y = event.y;
    this.pre_x = event.x;
    this.pre_y = event.y;
    if(this.extendedCardVisibility == "collapse") {
      this.isDown = true;
    }
  }

  cardMouseUp(event) {
    this.isDown = false;
    if(event.x == this.pre_x && event.y == this.pre_y) {
      this.extendCard(event);
    }
    this.pre_x = event.x;
    this.pre_y = event.y;
  }

  mouseup(event) {
    this.isDown = false;
    if(this.isCardOver) {
      this.deleteCard();
    } else {
      this.saveCard();
    }
    if(this.isCardOnDone && !this.isCardOver) {
      this.setDone();
    }
  }

  mousemove(event) {
    if(this.isDown) {
      this.left += event.x - this.x;
      this.top += event.y - this.y;
      this.x = event.x;
      this.y = event.y;
      let cardRect = {
        "left" : this.left,
        "top" : this.top,
        "right" : this.card.nativeElement.offsetWidth + this.left,
        "bottom" : this.card.nativeElement.offsetHeight + this.top
      };
      let trashRect = {
        "left" : this.trash.offsetLeft,
        "top" : this.trash.offsetTop,
        "right" : this.trash.offsetLeft + 100,
        "bottom" : this.trash.offsetTop + 100
      };
      if(cardRect.right > trashRect.left && cardRect.bottom > trashRect.top 
        && cardRect.left < trashRect.right && cardRect.top < trashRect.bottom) {
        if(!this.isCardOver) {
          this.isCardOver = true;
          this.trash.src = "assets/images/TrashEnter.png";
        }
      } else {
        if(this.isCardOver) {
          this.isCardOver = false;
          this.trash.src = "assets/images/Trash.png";
        }
        if(cardRect.right > trashRect.right + 5) {
          if(!this.isCardOnDone) {
            this.isCardOnDone = true;
          }
        } else {
          if(this.isCardOnDone) {
            this.isCardOnDone = false;
          }
        }
      }
    }
  }
  
  extendCard(event){
    event.stopPropagation();
    this.extendedCardVisibility = "visible";
    this.extendedCardLeft = this.left + 310;
    this.extendedCardTop = this.top;
    if(this.extendedCardTop + 500 > window.innerHeight) {
      this.extendedCardTop -= this.top + 500 - window.innerHeight;
    }
    if(this.extendedCardLeft + 500 > window.innerWidth) {
      this.extendedCardLeft = this.left - 500;
    }
  }

  clickExtendedCard(event) {
    event.stopPropagation();
  }
  
  closeExtendedCard(event) {
    event.stopPropagation();
    this.extendedCardVisibility = "collapse";
    this.saveCard();  
    this.timePicker.closes();
  }
  saveCard() {
    if(this.title == "") {
      return;
    }
    let todo = {
        "email": sessionStorage["email"],
        "id": this.todoId,
        "todo": this.title,
        "description": this.description,
        "due_date": this.dueDate,
        "due_time": this.dueTime,
        "left": this.left,
        "top": this.top,
        "z_index": this.index,
    }
    this.http.post("http://3.18.225.47:5000/todo/new", todo).subscribe(result => {
    }, err => {
    });
  }
  setDone() {
    let todo = {
        "email": sessionStorage["email"],
        "todo_id": this.todoId,
    }
    this.http.post("http://3.18.225.47:5000/todo/done", todo).subscribe(result => {
      this.element.nativeElement.style["visibility"] = "collapse";
      this.doneCard.emit(this.todoId);
      this.isCardOnDone = false;
    }, err => {
    });
  }

  pickDate(event) {
    this.dueDate = event.getFullYear() + "-" + (event.getMonth() + 1) + "-" + event.getDate();
  }
  pickTime(event) {
    this.dueTime = event;
  }
}
