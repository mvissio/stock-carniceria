import { Component } from '@angular/core';

import { TranslateService } from '@ngx-translate/core';
import {SettingsService} from './services/settings/settings.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private translate: TranslateService, private _setting: SettingsService) {
      this.translate.setDefaultLang('es');
    }

}

