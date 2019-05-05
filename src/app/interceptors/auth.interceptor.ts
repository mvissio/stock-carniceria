import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { AuthService } from '../services/auth/auth.service';
import { Router } from '@angular/router';

import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(
        private _authService: AuthService,
        private _router: Router,
      ) { }

      intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const authToken = this._authService.getAuthToken();
        const authReq = req.clone({headers: req.headers.set('Authorization', `Bearer ${authToken}`)});
        return next.handle(authReq);
    }
}

