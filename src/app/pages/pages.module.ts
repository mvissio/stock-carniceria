
import { NgModule } from '@angular/core';
import { PagesRoutingModule } from './pages.routes';

import { SharedModule } from '../shared/shared.module';

// ng2-charts

import { PagesComponent } from './pages.component';

import { HomeComponent } from './home/home.component';


// temporal
import { AccoutSettingsComponent } from './accout-settings/accout-settings.component';
import { ChartsModule } from 'ng2-charts';
import {ComponentsModule} from '../components/components.module';
import { ArticlesComponent } from './articles/articles.component';
import { ArticleComponent } from './articles/article/article.component';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './users/users.component';
import { UserComponent } from './users/user/user.component';


// others
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { NgSelectModule } from '@ng-select/ng-select';
import { OperationsComponent } from './operations/operations.component';
import { OperationComponent } from './operations/operation/operation.component';
import { OperationDetailsComponent } from './operations/operation-details/operation-details.component';
import { MeasurementUnitsComponent } from './measurement-units/measurement-units.component';
import { MeasurementUnitComponent } from './measurement-units/measurement-unit/measurement-unit.component';
import { BoxsComponent } from './boxs/boxs.component';
import {Graficas1Component} from './graficas1/graficas1.component';
import { CategoriesComponent } from './categories/categories.component';
import { CategoryComponent } from './categories/category/category.component';
import { BrowserModule } from '@angular/platform-browser';
import { MyDatePickerModule } from 'mydatepicker';

@NgModule({
  declarations: [
    PagesComponent,
    HomeComponent,
    AccoutSettingsComponent,
    UsersComponent,
    UserComponent,
    OperationsComponent,
    OperationComponent,
    OperationDetailsComponent,
    ArticlesComponent,
    Graficas1Component,
    ArticleComponent,
    MeasurementUnitComponent,
    MeasurementUnitsComponent,
    CategoriesComponent,
    CategoryComponent,
    BoxsComponent
  ],
  exports: [
    HomeComponent,
    TranslateModule
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
    SharedModule,
    PagesRoutingModule,
    ComponentsModule,
    BrowserModule,
    MyDatePickerModule
  ]
})
export class PagesModule { }
