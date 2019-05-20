import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from "rxjs/Observable";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  
  constructor(private router: Router, private http: HttpClient) {}
  
  ngOnInit() {
  }

  clickSignUp(name: string, email: string, password: string) {
    let user = {
      "name": name,
      "email": email,
      "password": password
    }
    this.http.post("http://3.18.225.47:5000/user/new", user).subscribe(result => {
      if(result["result"] == "success") {
        sessionStorage.email = email;
        sessionStorage.password = password;
        this.router.navigate(["/"]);
      } else {
        alert("email is duplicated");
      }
    }, err => {
      alert("err" + " " + err);
    });
  }
}
