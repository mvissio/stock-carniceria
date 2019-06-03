import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router';

import { NopagefoundComponent } from './nopagefound/nopagefound.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { TranslateModule } from '@ngx-translate/core';
import { PaginationComponent } from './pagination/pagination.component';
import { LoadingComponent } from './loading/loading.component';
import { DropdownTranslatePipe } from './pipes/dropdown-translate.pipe';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        TranslateModule
    ],
    declarations: [
        NopagefoundComponent,
        HeaderComponent,
        SidebarComponent,
        BreadcrumbsComponent,
        NopagefoundComponent,
        PaginationComponent,
        LoadingComponent,
        DropdownTranslatePipe
    ],
    exports: [
        CommonModule,
        RouterModule,
        TranslateModule,
        NopagefoundComponent,
        HeaderComponent,
        SidebarComponent,
        BreadcrumbsComponent,
        NopagefoundComponent,
        PaginationComponent,
        LoadingComponent,
        DropdownTranslatePipe
    ]
})
export class SharedModule { }
