import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDatepickerModule, MatNativeDateModule } from '@angular/material';
import {MatFormFieldModule, MatInputModule} from '@angular/material';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './todo-list/main/main.component';
import { SignInComponent } from './sign/sign-in/sign-in.component';
import { SignUpComponent } from './sign/sign-up/sign-up.component';
import { SignComponent } from './sign/sign/sign.component';
import { TodoCardComponent } from './todo-list/todo-card/todo-card.component';
import { TodoListComponent } from './todo-list/todo-list/todo-list.component';
import { TodoListCardComponent } from './todo-list/todo-list-card/todo-list-card.component';
import { TimePickerComponent } from './time-picker/time-picker.component';
import { DragedDoneCardComponent } from './todo-list/draged-done-card/draged-done-card.component';
import { ExtendedDoneCardComponent } from './todo-list/extended-done-card/extended-done-card.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    SignInComponent,
    SignUpComponent,
    SignComponent,
    TodoCardComponent,
    TodoListComponent,
    TodoListCardComponent,
    TimePickerComponent,
    DragedDoneCardComponent,
    ExtendedDoneCardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
