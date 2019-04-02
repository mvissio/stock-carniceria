import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './login/login.component';
import {NoPageFoundComponent} from './shared/no-page-found/no-page-found.component';
import {PagesComponent} from './pages/pages.component';
import {LoginGuardGuard} from './services/guards/login-guard.guard';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {
    path: '',
    component: PagesComponent,
    canActivate: [ LoginGuardGuard ]
  }
  // },
  // {path: '**',  component: NoPageFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
