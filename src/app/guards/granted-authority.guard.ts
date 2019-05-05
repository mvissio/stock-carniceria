import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/service.index';

@Injectable({
  providedIn: 'root'
})
export class GrantedAuthorityGuard implements CanActivate {

  constructor(private router: Router,
    private _authService: AuthService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (this._authService.hasPermissions(route.data.roles)) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
