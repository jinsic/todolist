import { Component, OnInit, ViewChild} from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  maxzIndex: number = 2;
  id: number = 0;
  trashImagePath: string = "assets/images/Trash.png";
  todos = [];
  doneTodos = [];
  @ViewChild("trash") trash;
  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.getTodo();
  }
  getTodo() {
    let user = {
      "email": sessionStorage["email"]
    };
    this.http.post("http://3.18.225.47:5000/todo/get", user).subscribe(result => {
      this.todos = [];
      this.doneTodos = [];
      for(let todo of result["todos"]) {
        let id = todo["todo_id"];
        let left = todo["left"];
        let top = todo["top"];
        let zIndex = todo["z_index"];
        let title = "";
        let description = "";
        let dueDate = "";
        let dueTime ="";
        let done = todo["done"];
        if("todo" in todo) {
          title = todo["todo"];
        }
        if("description" in todo) {
          description = todo["description"];
        }
        if("due_date" in todo) {
          dueDate = todo["due_date"];
        }
        if("due_time" in todo) {
          dueTime = todo["due_time"];
        }
        if(done == 1) {
          this.doneTodos.push(new Todo(id, title, description, dueDate, dueTime, left, top, zIndex));
        } else {
          this.todos.push(new Todo(id, title, description, dueDate, dueTime, left, top, zIndex));
        }
        if(this.id < id) {
          this.id = id;
        }
        if(this.maxzIndex < zIndex) {
          this.maxzIndex = zIndex;
        }
      }
      this.id++;
    }, err => {
    });
  }
  newTodo(event) {
    let left = event.x;
    if(event.x + 650 > window.innerWidth) {
      left -= event.x + 650 - window.innerWidth;
    }
    this.todos.push(new Todo(this.id, "", "", "", "", left, event.y, this.maxzIndex));
    this.maxzIndex += 1;
    this.id += 1;
  }
  clickTodo() {
    this.maxzIndex += 1;
  }

  openTrash() {
    this.trashImagePath = "assets/images/TrashEnter.png";
  }
  closeTrash() {
    this.trashImagePath = "assets/images/Trash.png";
  }
  doneCard(event) {
    this.getTodo();
  }
}

class Todo {
  title: string;
  description: string;
  dueTime: string;
  dueDate: string;
  left: number;
  top: number;
  zIndex: number;
  id: number;
  constructor(id: number, title:string, description: string
    , dueDate:string, dueTime:string, left:number, top: number, zIndex: number) {
    this.id = id;
    this.left = left;
    this.top = top;
    this.zIndex = zIndex;
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.dueTime = dueTime;
  }
}

