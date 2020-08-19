import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SignUpComponent} from './auth/sign-up/sign-up.component';
import {SignInComponent} from './auth/sign-in/sign-in.component';
import {MainContentComponent} from './main-content/main-content.component';
import {AuthGuard} from './auth/auth-guard.service';
import {DashboardComponent} from './dashboard/dashboard.component';

const routes: Routes = [
  {
    path: '', component: MainContentComponent, children: [
      {
        path: '', component: DashboardComponent, canActivate: [AuthGuard]
      },
      {
        path: 'sign-in', component: SignInComponent
      },
      {
        path: 'signUp', component: SignUpComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
