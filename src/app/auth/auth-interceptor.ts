import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpParams,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { exhaustMap, take } from 'rxjs/operators';
import { AppState } from '../store/app.reducer';
@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
  constructor(private store: Store<AppState>) {}
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    this.store.select('data').pipe(
      take(1),
      exhaustMap((userData) => {
        let modifiedReq;
        if (typeof userData.user.token === 'string') {
          let modifiedReq = req.clone({
            params: new HttpParams().set('auth', userData.user.token),
          });
        }
        if (!modifiedReq) {
          return next.handle(req);
        } else {
          return next.handle(modifiedReq);
        }
      })
    );
    return next.handle(req);
  }
}
