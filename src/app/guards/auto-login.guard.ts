import { Injectable } from '@angular/core';
import { CanLoad, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map, take } from 'rxjs/operators';
import { AuthenticationService } from '../services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AutoLoginGuard implements CanLoad {
  constructor(private authServicee: AuthenticationService, private router: Router) {}
  
  canLoad(): Observable<boolean> {
    return this.authServicee.isAuthenticated.pipe(
      filter(val => val !== null),
      take(1),
      map( isAuthenticated => {
        if (isAuthenticated) {
          this.router.navigateByUrl('/home', {replaceUrl: true})
        } else {
          return true;
        }
      })
    );
  }
}
