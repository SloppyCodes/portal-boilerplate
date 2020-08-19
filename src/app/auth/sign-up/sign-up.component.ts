import {Component, OnInit} from '@angular/core';
import {AuthService} from '../auth.service';
import {FormControl, FormGroup, NgForm, Validators} from '@angular/forms';
import {FunctionsService} from '../../shared/services/functions.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  signUpForm: FormGroup;

  constructor(private authService: AuthService, private functionsService: FunctionsService) {
  }

  ngOnInit() {
    this.signUpForm = new FormGroup({
      firstName: new FormControl(null, Validators.required),
      lastName: new FormControl(null, Validators.required),
      email: new FormControl(null, [Validators.required, Validators.email]),
      confirmEmail: new FormControl(null, [Validators.required, Validators.email]),
      pwd: new FormControl(null, Validators.required),
      confirmPwd: new FormControl(null, Validators.required)
    });
  }

  onSignUp() {
    const firstName = this.signUpForm.value.firstName;
    const lastName = this.signUpForm.value.lastName;
    const email = this.signUpForm.value.email;
    const confirmEmail = this.signUpForm.value.confirmEmail;
    const pwd = this.signUpForm.value.pwd;
    const confirmPwd = this.signUpForm.value.confirmPwd;

    if (this.signUpForm.valid) {
      const data = {
        firstName,
        lastName,
        email,
        password: pwd
      };

      if (email !== confirmEmail) {
        this.functionsService.showInfoSnack('Email address does not match!');
        return;
      }

      if (pwd !== confirmPwd) {
        this.functionsService.showInfoSnack('Password does not match!');
        return;
      }

      this.authService.signUp(data);
    } else {
      this.functionsService.showInfoSnack('Please fill the required fields!');
    }
  }
}
