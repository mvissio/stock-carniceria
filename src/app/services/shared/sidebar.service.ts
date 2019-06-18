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
      ]
    },
    {
      titulo: 'Transacciones',
      icono: 'mdi mdi-currency-usd',
      roles: [roles.sysAdmin, roles.admin],
      submenu: [
        { titulo: 'Caja', url: '/caja' },
        { titulo: 'Operaciones', url: '/operaciones' },
      ]
    },
    {
      titulo: 'Configuraciones',
      icono: 'mdi mdi-settings',
      roles: [roles.sysAdmin, roles.admin],
      submenu: [
        { titulo: 'Usuarios', url: '/configuracion/usuarios', roles: [roles.sysAdmin] },
        { titulo: 'Articulos', url: '/configuracion/articulos' },
        { titulo: 'Unidades de medida', url: '/configuracion/unidadesMedida' }
      ]
    }
  ];

  constructor() { }

}
