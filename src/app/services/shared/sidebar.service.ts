import { Injectable } from '@angular/core';

@Injectable()
export class SidebarService {

  menu: any = [
    {
      titulo: 'Principal',
      icono: 'mdi mdi-gauge',
      submenu: [
        { titulo: 'Dashboard', url: '/home' },
        { titulo: 'Gráficas', url: '/graficas1' }
      ]
    }
  ];

  constructor() { }

}
