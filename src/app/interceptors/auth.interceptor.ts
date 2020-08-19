import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import { Injectable } from "@angular/core";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('token');
    if (token) {
      const copiedRequest = req.clone({headers: req.headers.append('x-auth', localStorage.getItem('token'))});

      return next.handle(copiedRequest);
    }

    return next.handle(req);
  }
}
