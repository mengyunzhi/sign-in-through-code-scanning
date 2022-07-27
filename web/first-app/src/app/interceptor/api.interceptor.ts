import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {

  // private static api = 'http://localhost:8080/api/sign-in-through-code-scanning/api/public/api';
  static api = '/api/sign-in-through-code-scanning/api/public/api';

  private static getApiUrl(url: string): string {
    if (url.startsWith('/')) {
      return this.api + url;
    } else {
      return this.api + '/' + url;
    }
  }

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const url = ApiInterceptor.getApiUrl(request.url);
    const req = request.clone({url});
    return next.handle(req);
  }
}
