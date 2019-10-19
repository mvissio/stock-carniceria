import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {RouterModule} from '@angular/router';

import {HeaderComponent} from './header/header.component';
import {SidebarComponent} from './sidebar/sidebar.component';
import {BreadcrumbsComponent} from './breadcrumbs/breadcrumbs.component';
import {TranslateModule} from '@ngx-translate/core';
import {PaginationComponent} from './pagination/pagination.component';
import {LoadingComponent} from './loading/loading.component';
import {DropdownTranslatePipe} from './pipes/dropdown-translate.pipe';
import {TruncatePipe} from './pipes/truncate.pipe';
import {DefaultValuePipe} from './pipes/default-value.pipe';
import {AutoFocusForEverDirective} from './directives/auto-focus-for-ever.directive';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    TranslateModule
  ],
  declarations: [
    HeaderComponent,
    SidebarComponent,
    BreadcrumbsComponent,
    PaginationComponent,
    LoadingComponent,
    DropdownTranslatePipe,
    TruncatePipe,
    DefaultValuePipe,
    AutoFocusForEverDirective,
  ],
  exports: [
    CommonModule,
    RouterModule,
    TranslateModule,
    HeaderComponent,
    SidebarComponent,
    BreadcrumbsComponent,
    PaginationComponent,
    LoadingComponent,
    DropdownTranslatePipe,
    TruncatePipe,
    DefaultValuePipe,
    AutoFocusForEverDirective,
  ]
})
export class SharedModule {
}
