import { Injectable } from '@angular/core';
import { roles } from '../../constants/constant';

@Injectable()
export class SidebarService {

  menu: any = [
    {
      titulo: 'Principal',
      icono: 'mdi mdi-gauge',
      roles: [roles.admin],
      submenu: [
        { titulo: 'Inicio', url: '/inicio' },
        { titulo: 'Gráficas', url: '/graficas1' }
      ]
    },
    {
      titulo: 'Transacciones',
      icono: 'mdi mdi-currency-usd',
      roles: [roles.sysAdmin, roles.admin],
      submenu: [
        { titulo: 'Operaciones', url: '/operaciones' },
      ]
    },
    {
      titulo: 'Configuraciones',
      icono: 'mdi mdi-settings',
      roles: [roles.sysAdmin, roles.admin],
      submenu: [
        { titulo: 'Usuarios', url: '/usuarios', roles: [roles.sysAdmin] },
        { titulo: 'Articulos', url: '/articulos' },
        { titulo: 'Unidades de medida', url: '/unidadesMedida' }
      ]
    }
  ];

  constructor() { }

}
