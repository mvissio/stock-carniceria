import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './login/login.component';
import {NoPageFoundComponent} from './shared/no-page-found/no-page-found.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: '**',  component: NoPageFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
