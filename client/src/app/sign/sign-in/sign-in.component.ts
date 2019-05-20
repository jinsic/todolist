import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  constructor(private router: Router, private http: HttpClient) { }

  ngOnInit() {
    if("email" in sessionStorage && "password" in sessionStorage) {
      this.router.navigate(["/"]);
    } else if("email" in localStorage && "password" in localStorage) {
      this.router.navigate(["/"]);
    }
  }

  clickSignUp() {
    this.router.navigate(["/sign/up"]);
  }
  clickSignIn(email: string, password: string, remain: boolean) {
    let user = {
      "email": email,
      "password": password,
    }
    this.router.navigate(["/"]);
    this.http.post("http://3.18.225.47:5000/user/exists", user).subscribe(result => {
      if(result["result_code"] == 1) {
        if(remain) {
          localStorage.email = email;
          localStorage.password = password;
        } 
        sessionStorage.email = email;
        sessionStorage.password = password;
        
        this.router.navigate(["/"]);
      }
    }, err => {
        console.log(err);
    });
  }
}
