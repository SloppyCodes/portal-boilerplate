import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {Router} from '@angular/router';
import {PasswordReset} from '../shared/interfaces/password-reset.interface';
import {environment} from '../../environments/environment';
import {FunctionsService} from '../shared/services/functions.service';

@Injectable()
export class AuthService {
  userLoggedIn = new Subject<boolean>();

  constructor(private httpClient: HttpClient,
              private router: Router,
              private functionsService: FunctionsService) {
  }

  login(email: string, password: string): void {
    const body = {email, password};
    this.httpClient.post(`${environment.serverUrl}/login`, body, {observe: 'response'}).subscribe((data: any) => {
      const token = data.headers.get('x-auth');

      if (token) {
        localStorage.setItem('token', token);
        localStorage.setItem('email', email);

        this.userLoggedIn.next(true);

        this.router.navigate(['/dashboard']);
      } else {
        this.userLoggedIn.next(false);
      }
    }, (err) => {
      this.functionsService.showInfoSnack(environment.errorMsg);
      this.userLoggedIn.next(false);
    });
  }

  signUp(data: {}) {
    if (environment.IS_DEMO) {
      this.functionsService.showInfoSnack(environment.DEMO_DISABLED_MSG);
    } else {
      this.httpClient.post(`${environment.serverUrl}/signUp`, data, {observe: 'response'}).subscribe((res: any) => {
        this.functionsService.showInfoSnack('Account successfully created! You can login!');
        this.router.navigate(['sign-in']);
      }, (err) => {
        console.log(err);
        this.functionsService.showInfoSnack(environment.errorMsg);
        this.userLoggedIn.next(false);
      });
    }
  }

  resetPassword(email: string) {
    if (environment.IS_DEMO) {
      this.functionsService.showInfoSnack(environment.DEMO_DISABLED_MSG);
    } else {
      const data = {email};
      this.httpClient.post(`${environment.serverUrl}/resetPassword`, data, {observe: 'response'}).subscribe((res: any) => {
        this.functionsService.showInfoSnack('Please, check your email!');
      }, (err) => {
        this.functionsService.showInfoSnack(environment.errorMsg);
      });
    }
  }

  setNewPassword(data: PasswordReset) {
    if (environment.IS_DEMO) {
      this.functionsService.showInfoSnack(environment.DEMO_DISABLED_MSG);
    } else {
      this.httpClient.post(`${environment.serverUrl}/setNewPassword`, data, {observe: 'response'}).subscribe((res: any) => {
        this.functionsService.showInfoSnack('Password reset successfully! You can sign in using your new password!');
        this.router.navigate(['sign-in']);
      }, (err) => {
        this.functionsService.showInfoSnack(environment.errorMsg);
      });
    }
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }

  logout(): void {
    const email = localStorage.getItem('email');
    const body = {email};

    this.httpClient.post(`${environment.serverUrl}/logout`, body).subscribe((data) => {
      localStorage.removeItem('token');
      localStorage.removeItem('email');

      this.router.navigate(['sign-in']);
    }, (err) => {
      this.functionsService.showInfoSnack(environment.errorMsg);
    });
  }
}
