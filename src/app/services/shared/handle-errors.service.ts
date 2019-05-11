import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HandleErrorsService {

  private errorMessage: string;

  constructor(private translate: TranslateService) { }

  handleErrors(err: HttpErrorResponse, childLabel?: string): string {
    const generalKeyLabel = 'generalHTTPErrors';
    switch (err.status) {
      case 400:
        this.errorMessage = (err.error)? err.error.message : this.translate.get(generalKeyLabel + '.request')
        .subscribe((res: string) => this.errorMessage = res);
      break;
      case 403:
        this.translate.get(generalKeyLabel + (childLabel)? childLabel : '.authorization')
        .subscribe((res: string) => this.errorMessage = res);
      break;
      case 404:
      this.errorMessage = (err.error)? err.error.message : this.translate.get(generalKeyLabel + '.notFound')
      .subscribe((res: string) => this.errorMessage = res);
      break;
      case 409:
        this.errorMessage = (err.error)? err.error.message : this.translate.get(generalKeyLabel + '.confict')
        .subscribe((res: string) => this.errorMessage = res);
      break;
      default:
        this.translate.get(generalKeyLabel + '.server')
          .subscribe((res: string) => this.errorMessage = res);
      break;
    }
    return this.errorMessage;
  }
}
