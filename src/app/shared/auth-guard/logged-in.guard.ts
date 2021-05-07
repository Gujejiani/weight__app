import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { AppState } from 'src/app/store/app.reducer';

@Injectable({ providedIn: 'root' })
export class LoggedInGuard implements CanActivate {
  constructor(private store: Store<AppState>, private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    return new Promise((resolve) => {
      this.store.pipe(take(1)).subscribe((state: AppState) => {
        if (!state.auth.user) {
          resolve(true);
        } else {
          resolve(false);
          this.router.navigate(['/dashboard']);
        }
        resolve(true);
      });
    });
  }
}
