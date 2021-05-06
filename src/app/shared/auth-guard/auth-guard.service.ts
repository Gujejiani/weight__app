import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { Store } from '@ngrx/store';

import { Observable } from 'rxjs';
import { State } from 'src/app/auth/store/auth.reducer';
import { LoginService } from '../login.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private loginService: LoginService,
    private router: Router,
    private store: Store<{ auth: State }>
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    let authenticated: boolean = this.loginService.isAuthenticated();
    this.store.select('auth').subscribe((authState) => {
      if (authState.user) {
        authenticated = true;
      }
    });
    console.log(authenticated);
    if (authenticated) {
      return true;
    } else {
      this.router.navigate(['/login']);
      this.loginService.userLoggedIn.next(false);
    }
  }
}
