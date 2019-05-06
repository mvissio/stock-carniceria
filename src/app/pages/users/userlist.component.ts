import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styles: []
})
export class UserlistComponent implements OnInit {
  cargando = true;

  constructor() {
  }

  ngOnInit() {
  }

  buscarUsuario(termino: string) {

    if (termino.length <= 0) {
      // this.cargarUsuarios();
      return;
    }

    this.cargando = true;

    // this._usuarioService.buscarUsuarios( termino )
    //   .subscribe( (usuarios: Usuario[]) => {
    //
    //     this.usuarios = usuarios;
    //     this.cargando = false;
    //   });
  }
}
