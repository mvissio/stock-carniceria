
import { NgModule } from '@angular/core';
import { PAGES_ROUTES } from './pages.routes';

import { SharedModule } from '../shared/shared.module';

// ng2-charts

import { PagesComponent } from './pages.component';

import { HomeComponent } from './home/home.component';
import { Graficas1Component } from './graficas1/graficas1.component';


// temporal
import { AccoutSettingsComponent } from './accout-settings/accout-settings.component';
import { ChartsModule } from 'ng2-charts';
import {ComponentsModule} from '../components/components.module';
import { UsersComponent } from './users/users.component';
import { CommonModule } from '@angular/common';
import { UserComponent } from './users/user/user.component';

// others
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
    declarations: [
      PagesComponent,
      HomeComponent,
      AccoutSettingsComponent,
      Graficas1Component,
      UsersComponent,
      UserComponent
    ],
    exports: [
      HomeComponent,
      Graficas1Component,
      TranslateModule
    ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    PAGES_ROUTES,
    ComponentsModule
  ]
})
export class PagesModule { }
