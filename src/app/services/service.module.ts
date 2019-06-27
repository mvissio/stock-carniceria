import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  SettingsService,
  SidebarService,
  SharedService,
  AuthService
 } from './service.index';
import {HttpClientModule} from '@angular/common/http';
import {BoxsService} from './pages/boxs.service';


@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    SettingsService,
    SidebarService,
    SharedService,
    AuthService,
    BoxsService
  ],
  declarations: []
})
export class ServiceModule { }
