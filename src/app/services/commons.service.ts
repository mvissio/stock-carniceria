import {Injectable} from '@angular/core';
import {ToastrService} from 'ngx-toastr';
import {TranslateService} from '@ngx-translate/core';
import {toastPosition, toastType} from '../constants/constant';

@Injectable({
  providedIn: 'root'
})
export class CommonsService {

  constructor(private toastr: ToastrService,
              private translate: TranslateService) {
  }

  showMessage(type: string, message: string, position: string = toastPosition.default) {
    switch (type) {
      case toastType.error:
        this.translate.get('toast.error').subscribe((title) => {
          this.toastr.error(message, title, {positionClass: position});
        });
        break;
      case toastType.warning:
        this.translate.get('toast.warning').subscribe((title) => {
          this.toastr.warning(message, title, {positionClass: position});
        });
        break;
      case toastType.info:
        this.translate.get('toast.info').subscribe((title) => {
          this.toastr.info(message, title, {positionClass: position});
        });
        break;
      default:
        this.translate.get('toast.success').subscribe((title) => {
          this.toastr.success(message, title, {positionClass: position});
        });
        break;
    }
  }
}
