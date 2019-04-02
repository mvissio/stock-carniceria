import { NgModule } from '@angular/core';
import {PagesComponent} from './pages.component';
import {HomeComponent} from './home/home.component';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {
    path: '', component: PagesComponent, children: [
      {path: '', redirectTo: '/home', pathMatch: 'full'},
      {path: 'home', component: HomeComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
