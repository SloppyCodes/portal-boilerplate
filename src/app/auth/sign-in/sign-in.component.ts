import {Component, OnInit} from '@angular/core';
import {AuthService} from '../auth.service';
import {Subscription} from 'rxjs';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  loginSubscription: Subscription;

  constructor(private authService: AuthService) {
    this.loginSubscription = this.authService.userLoggedIn.subscribe((isLogged: boolean) => {
      if (isLogged) {
      }
    });
  }

  ngOnInit() {
  }

  onLogIn(form: NgForm) {
    const email = form.value.email;
    const password = form.value.currentPass;

    this.authService.login(email, password);
  }

}
