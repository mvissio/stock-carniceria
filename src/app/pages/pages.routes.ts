import {RouterModule, Routes} from '@angular/router';

import {PagesComponent} from './pages.component';
import {HomeComponent} from './home/home.component';
import {Graficas1Component} from './graficas1/graficas1.component';
import {AccoutSettingsComponent} from './accout-settings/accout-settings.component';
import {roles} from '../constants/constant';
import {AuthGuard} from '../guards/auth.guard';
import {GrantedAuthorityGuard} from '../guards/granted-authority.guard';
import { UsersComponent } from './users/users.component';
import { UserComponent } from './users/user/user.component';

const pagesRoutes: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: [
      {
        path: 'inicio', component: HomeComponent,
        canActivate: [AuthGuard, GrantedAuthorityGuard],
        data: {titulo: 'Inicio', roles: [roles.administrador]}
      },
      {
        path: 'tema', component: AccoutSettingsComponent,
        canActivate: [AuthGuard, GrantedAuthorityGuard],
        data: {titulo: 'Ajustes de Tema', roles: [roles.administrador, roles.usuario]}
      },
      {
        path: 'graficas1', component: Graficas1Component,
        canActivate: [AuthGuard, GrantedAuthorityGuard],
        data: {titulo: 'Gráficas', roles: [roles.administrador]}
      },
      {path: '', redirectTo: '/inicio', pathMatch: 'full'}
    ]
  },
  {
    path: 'configuracion',
    component: PagesComponent,
    children: [
      {
        path: 'usuarios',
        component: UsersComponent,
        canActivate: [AuthGuard, GrantedAuthorityGuard],
        data: {
          titulo: 'Usuarios', roles: [roles.administrador]
        },
      },
      { 
        path: 'usuario/:id', component: UserComponent,
        canActivate: [AuthGuard, GrantedAuthorityGuard],
        data: {titulo: 'Actualizar Usuario', roles: [roles.administrador]}
      },
      { 
        path: 'usuario', component: UserComponent,
        canActivate: [AuthGuard, GrantedAuthorityGuard],
        data: {titulo: 'Crear Usuario', roles: [roles.administrador]}
      },
      {path: '', redirectTo: '/inicio', pathMatch: 'full'}
    ]
  }
];


export const PAGES_ROUTES = RouterModule.forChild(pagesRoutes);
