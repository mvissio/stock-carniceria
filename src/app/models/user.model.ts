import { Rol } from './rol.model';

export class User {
    userId: number;
    username: string;
    email: string;
    password?: string;
    enabled?: boolean;
    rol?: Rol;
    constructor(
        userId?: number,
        username?: string,
        email?: string,
        password?: string,
        enabled?: boolean,
        rol?: Rol,
    ) {
        this.userId = userId;
        this.username = username;
        this.email = email;
        this.password = password;
        this.enabled = enabled || true;
        this.rol = rol;
    }
}
