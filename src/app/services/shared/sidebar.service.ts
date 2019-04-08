import { Injectable } from '@angular/core';

@Injectable()
export class SidebarService {

  menu: any = [
    {
      titulo: 'Principal',
      icono: 'mdi mdi-gauge',
      submenu: [
        { titulo: 'Inicio', url: '/inicio' },
        { titulo: 'Gráficas', url: '/graficas1' }
      ]
    },
    {
      titulo: 'Configuraciones',
      icono: 'mdi mdi-settings',
      submenu: [
        { titulo: 'Productos', url: '/configuracion/productos' },
        { titulo: 'Precios', url: '/configuracion/precios' },
        { titulo: 'Usuarios', url: '/configuracion/usuarios' },
      ]
    }
  ];

  constructor() { }

}
