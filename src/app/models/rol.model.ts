export class Rol {
  rolId: number;
  name: string;
  
  constructor(
    name: string,
    rolId?: number
  ) {
    this.name = name;
    this.rolId = rolId;
  }
  
}

