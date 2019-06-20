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
import { OperationsComponent } from './operations/operations.component';
import { OperationComponent } from './operations/operation/operation.component';
import { ArticlesComponent } from './articles/articles.component';
import { ArticleComponent } from './articles/article/article.component';
import { MeasurementUnitsComponent } from './measurement-units/measurement-units.component';
import { MeasurementUnitComponent } from './measurement-units/measurement-unit/measurement-unit.component';
import { NgModule } from '@angular/core';

const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: [
      {
        path: 'inicio', component: HomeComponent,
        canActivate: [AuthGuard, GrantedAuthorityGuard],
        data: {titulo: 'Inicio', roles: [roles.sysAdmin, roles.admin]}
      },
      {
        path: 'graficas1', component: Graficas1Component,
        canActivate: [AuthGuard, GrantedAuthorityGuard],
        data: {titulo: 'Gráficas', roles: [roles.sysAdmin, roles.admin]}
      },
      {
        path: 'operaciones',
        component: OperationsComponent,
        canActivate: [AuthGuard, GrantedAuthorityGuard],
        data: {titulo: 'Operaciones', roles: [roles.sysAdmin, roles.admin]},
      },
      { 
        path: 'operacion/:id', component: OperationComponent,
        canActivate: [AuthGuard, GrantedAuthorityGuard],
        data: {titulo: 'Actualizar Operacion', roles: [roles.sysAdmin, roles.admin]}
      },
      { 
        path: 'operacion', component: OperationComponent,
        canActivate: [AuthGuard, GrantedAuthorityGuard],
        data: {titulo: 'Crear Operacion', roles: [roles.sysAdmin, roles.admin]}
      },
      {
        path: 'tema', component: AccoutSettingsComponent,
        canActivate: [AuthGuard, GrantedAuthorityGuard],
        data: {titulo: 'Ajustes de Tema', roles: Object.values(roles)}
      },
      {
        path: 'usuarios',
        component: UsersComponent,
        canActivate: [AuthGuard, GrantedAuthorityGuard],
        data: {titulo: 'Usuarios', roles: [roles.sysAdmin]},
      },
      { 
        path: 'usuario/:id', component: UserComponent,
        canActivate: [AuthGuard, GrantedAuthorityGuard],
        data: {titulo: 'Actualizar Usuario', roles: [roles.sysAdmin]}
      },
      { 
        path: 'usuario', component: UserComponent,
        canActivate: [AuthGuard, GrantedAuthorityGuard],
        data: {titulo: 'Crear Usuario', roles: [roles.sysAdmin]}
      },
      {
        path: 'articulos',
        component: ArticlesComponent,
        canActivate: [AuthGuard, GrantedAuthorityGuard],
        data: {titulo: 'Articulos', roles: [roles.sysAdmin, roles.admin]},
      },
      { 
        path: 'articulo/:id', component: ArticleComponent,
        canActivate: [AuthGuard, GrantedAuthorityGuard],
        data: {titulo: 'Actualizar Articulo', roles: [roles.sysAdmin, roles.admin]}
      },
      { 
        path: 'articulo', component: ArticleComponent,
        canActivate: [AuthGuard, GrantedAuthorityGuard],
        data: {titulo: 'Crear Articulo', roles: [roles.sysAdmin, roles.admin]}
      },
      {
        path: 'unidadesMedida',
        component: MeasurementUnitsComponent,
        canActivate: [AuthGuard, GrantedAuthorityGuard],
        data: {titulo: 'Unidades de Medida', roles: [roles.sysAdmin, roles.admin]},
      },
      { 
        path: 'unidadMedida/:id', component: MeasurementUnitComponent,
        canActivate: [AuthGuard, GrantedAuthorityGuard],
        data: {titulo: 'Actualizar unidad de medida', roles: [roles.sysAdmin, roles.admin]}
      },
      { 
        path: 'unidadMedida', component: MeasurementUnitComponent,
        canActivate: [AuthGuard, GrantedAuthorityGuard],
        data: {titulo: 'Crear unidadMedida', roles: [roles.sysAdmin, roles.admin]}
      },
      {path: '', redirectTo: '/inicio', pathMatch: 'full'},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
