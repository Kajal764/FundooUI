import {Injectable} from '@angular/core';
import {HttpEvent, HttpHeaders, HttpInterceptor} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  constructor() {
  }

  intercept(req, next): Observable<HttpEvent<any>> {
    const tokenizeRequest = req.clone({
      setHeaders: {
        AuthorizeToken: localStorage.getItem('token')
      }
    });
    return next.handle(tokenizeRequest);
  }
}


