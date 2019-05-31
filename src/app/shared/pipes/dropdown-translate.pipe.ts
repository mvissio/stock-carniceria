import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Pipe({
  name: 'dropdownTranslate'
})
export class DropdownTranslatePipe implements PipeTransform {

  result: any;

  constructor(private translate: TranslateService) {}

  transform(value: any, key: string): string {
    this.translate.get(key)
      .subscribe((values: any) => this.result = values);
      return this.result[value];
  }

}
