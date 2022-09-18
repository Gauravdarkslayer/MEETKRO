import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpErrorResponse, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { JwtService } from '../services';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class HttpTokenInterceptor implements HttpInterceptor {
  constructor(private jwtService: JwtService, private router: Router) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!window.navigator.onLine) {
      return throwError(new HttpErrorResponse({ error: 'No Internet Connection' }));
    } else {
      const token = this.jwtService.getToken();
      if (token) {
        let request;
        request = req.clone({ headers: req.headers.set('Authorization', `Bearer ${token as string}`) });
        return next.handle(request).pipe(
          catchError((err: HttpErrorResponse) => {
            if (err.status === 401) {
              this.jwtService.destroyToken();
              this.router.navigate(['/']);
              return throwError(err);

            } else {
              return throwError(err);
            }
          })
        );
      } else {
        return next.handle(req).pipe(
          catchError((err: HttpErrorResponse) => {
            if (err.status === 401) {
              this.jwtService.destroyToken();
              this.router.navigate(['/']);
              return throwError(err);

            } else {
              return throwError(err);
            }
          })
        );
      }
    }

  }
}
