
import { NgModule } from '@angular/core';
import { PAGES_ROUTES } from './pages.routes';

import { SharedModule } from '../shared/shared.module';

import { FormsModule } from '@angular/forms';


// ng2-charts

import { PagesComponent } from './pages.component';

import { HomeComponent } from './home/home.component';
import { Graficas1Component } from './graficas1/graficas1.component';


// temporal
import { AccoutSettingsComponent } from './accout-settings/accout-settings.component';
import { ChartsModule } from 'ng2-charts';
import {ComponentsModule} from '../components/components.module';

@NgModule({
    declarations: [
        PagesComponent,
        HomeComponent,
      AccoutSettingsComponent,
      Graficas1Component,
    ],
    exports: [
        HomeComponent,
        Graficas1Component
    ],
  imports: [
    SharedModule,
    PAGES_ROUTES,
    ComponentsModule
  ]
})
export class PagesModule { }
