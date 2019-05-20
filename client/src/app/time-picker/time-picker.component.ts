import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-time-picker',
  templateUrl: './time-picker.component.html',
  styleUrls: ['./time-picker.component.scss']
})
export class TimePickerComponent implements OnInit {

  hour: number;
  min: number;
  noon: string;
  time: string;
  top: number;
  ori_top: number;
  visibility: string = "collapse";
  is_upper: boolean = false;
  @ViewChild("timePicker", { read: ElementRef }) timePicker;
  @ViewChild("input") input;
  @Output() timeChanged: EventEmitter<string> = new EventEmitter();
  constructor() { }

  ngOnInit() {
    let date = new Date();
    this.hour = date.getHours();
    this.noon = "AM"
    if(date.getHours() > 12) {
      this.hour -= 12;
      this.noon = "PM"
    }
    this.min = date.getMinutes();
    this.top = this.timePicker.nativeElement.offsetTop;
    this.ori_top = this.top;
  }

  click(event) {
    this.visibility = "visible";
    if(this.timePicker.nativeElement.getBoundingClientRect().top + 130 + this.ori_top - this.top > window.innerHeight) {
      this.top = 318;
      this.is_upper = true;
    } else {
      this.top = 480;
    }
  }

  close(event) {
    let rect = this.input.nativeElement.getBoundingClientRect();
    let left = rect.left;
    let right = rect.right;
    let top = rect.top;
    let bottom = rect.bottom;
    if(this.is_upper) {
      top -= 122;
    } else {
      bottom += 120;
    }
    if((event.x < left || event.x > right) || (event.y < top || event.y > bottom)) {
      this.visibility = "collapse";
    }
  }
  closes() {
    this.visibility = "collapse";
  }

  hourUp() {
    this.hour += 1;
    if(this.hour > 11) {
      if(this.noon == "AM") {
        this.noon = "PM";
      } else {
        this.noon = "AM";
      }
    }
    if(this.hour > 12) {
      this.hour = 1;
    }
    this.setTime();
  }
  minUp() {
    this.min += 1;
    if(this.min > 59) {
      this.hourUp();
      this.min = 0;
    }
    this.setTime();
  }
  noonUp() {
    if(this.noon == "AM") {
      this.noon = "PM";
    } else {
      this.noon = "AM";
    }
    this.setTime();
  }
  hourDown() {
    this.hour -= 1;
    if(this.hour < 1) {
      if(this.noon == "AM") {
        this.noon = "PM";
      } else {
        this.noon = "AM";
      }
      this.hour = 12;
    }
    this.setTime();
  }
  minDown() {
    this.min -= 1;
    if(this.min < 1) {
      this.hourDown();
      this.min = 59;
    }
    this.setTime();
  }
  noonDown() {
    this.noonUp();
  }
  setTime() {
    this.time = this.hour+":"+this.min+" "+this.noon;
    this.timeChanged.emit(this.time);
  }
}
