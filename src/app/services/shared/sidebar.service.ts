import { Injectable } from '@angular/core';
import { roles } from '../../constants/constant';

@Injectable()
export class SidebarService {

  menu: any = [
    {
      titulo: 'Principal',
      icono: 'mdi mdi-gauge',
      roles: [roles.administrador],
      submenu: [
        { titulo: 'Inicio', url: '/inicio' },
        { titulo: 'Gráficas', url: '/graficas1' }
      ]
    },
    {
      titulo: 'Configuraciones',
      icono: 'mdi mdi-settings',
      roles: [roles.administrador],
      submenu: [
        { titulo: 'Productos', url: '/configuracion/productos' },
        { titulo: 'Precios', url: '/configuracion/precios' },
        { titulo: 'Usuarios', url: '/configuracion/usuarios' },
        { titulo: 'Articulos', url: '/configuracion/articulos' }
      ]
    }
  ];

  constructor() { }

}
