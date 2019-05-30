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
import { ArticlesComponent } from './articles/articles.component';
import { ArticleComponent } from './articles/article/article.component';
import { MeasurementUnitsComponent } from './measurement-units/measurement-units.component';
import { MeasurementUnitComponent } from './measurement-units/measurement-unit/measurement-unit.component';



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

      {
        path: 'articulos',
        component: ArticlesComponent,
        canActivate: [AuthGuard, GrantedAuthorityGuard],
        data: {
          titulo: 'Articulos', roles: [roles.administrador]
        },
      },
      { 
        path: 'articulo/:id', component: ArticleComponent,
        canActivate: [AuthGuard, GrantedAuthorityGuard],
        data: {titulo: 'Actualizar Articulo', roles: [roles.administrador]}
      },
      { 
        path: 'articulo', component: ArticleComponent,
        canActivate: [AuthGuard, GrantedAuthorityGuard],
        data: {titulo: 'Crear Articulo', roles: [roles.administrador]}
      },

      {
        path: 'unidadesMedida',
        component: MeasurementUnitsComponent,
        canActivate: [AuthGuard, GrantedAuthorityGuard],
        data: {
          titulo: 'Unidades de Medida', roles: [roles.administrador]
        },
      },
      { 
        path: 'unidadMedida/:id', component: MeasurementUnitComponent,
        canActivate: [AuthGuard, GrantedAuthorityGuard],
        data: {titulo: 'Actualizar unidad de medida', roles: [roles.administrador]}
      },
      { 
        path: 'unidadMedida', component: MeasurementUnitComponent,
        canActivate: [AuthGuard, GrantedAuthorityGuard],
        data: {titulo: 'Crear unidadMedida', roles: [roles.administrador]}
      }    
      ,{path: '', redirectTo: '/inicio', pathMatch: 'full'}
    ]
  }
];


export const PAGES_ROUTES = RouterModule.forChild(pagesRoutes);
