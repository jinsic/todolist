import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './todo-list/main/main.component';
import { SignInComponent } from './sign/sign-in/sign-in.component';
import { SignUpComponent } from './sign/sign-up/sign-up.component';
import { SignComponent } from './sign/sign/sign.component';
import { SignGuard } from './sign/sign.guard';

const routes: Routes = [
  { path: "sign", component: SignComponent,
    children: [
      { path: "in", component: SignInComponent },
      { path: "up", component: SignUpComponent },
    ]
  },
  { path: "", component: MainComponent, canActivate: [SignGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
