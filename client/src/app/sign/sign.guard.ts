import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class SignGuard implements CanActivate {
  constructor(private router: Router) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if ("email" in sessionStorage && "password" in sessionStorage) {
      return true;
    } else if("email" in localStorage && "password" in localStorage) {
      sessionStorage.email = localStorage.email;
      sessionStorage.password = localStorage.password;
      return true;
    } else {
      this.router.navigate(["/sign/in"]);
      return false;
    }
  }
}
