export class Rol {
  rolId: number;
  nombre: string;
  
  constructor(
    nombre: string,
    rolId?: number
  ) {
    this.nombre = nombre;
    this.rolId = rolId;
  }
  
}

