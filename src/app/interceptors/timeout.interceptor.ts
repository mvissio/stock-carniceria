import { Inject, Injectable, InjectionToken } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { timeoutWith } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';

export const DEFAULT_TIMEOUT = new InjectionToken<number>('defaultTimeout');

@Injectable()
export class TimeoutInterceptor implements HttpInterceptor {
  constructor(@Inject(DEFAULT_TIMEOUT) protected defaultTimeout: number,
   private translate: TranslateService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const timeoutValue = Number(req.headers.get('timeout')) || this.defaultTimeout;
    let errorMessage: string;
    this.translate.get('generalHTTPErrors.timeOut')
        .subscribe((res: string) => errorMessage = res);
    return next.handle(req).pipe(timeoutWith(timeoutValue, throwError(new Error(errorMessage))));
  }
}