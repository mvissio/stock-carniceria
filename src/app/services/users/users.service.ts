import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Rol } from '../../models/rol.model';
import { User } from '../../models/user.model';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import * as bcrypt from 'bcryptjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  userUrl = environment.apiUrls.user;
  user: User = new User();

  constructor( private httpClient: HttpClient) { }

  roles: Rol[] = [];
  rolesSelected: Rol[] = [];

  addUser(user: User) {
    let newUser = Object.assign({}, user); 
    newUser.enabled = true;
    newUser.password = bcrypt.hashSync(newUser.password, 10);
    const url = this.userUrl.base;
    return this.httpClient.post(url, newUser)
      .pipe(map((newUser: any) => newUser));
  }

  getAllUsers() {
    const url = this.userUrl.base;
    return this.httpClient.get(url)
      .pipe(map((response) => response));
  }

  getUserByUserId(id: number) {
    const url = `${this.userUrl.getUserByUserId}?id=${id}`;
    return this.httpClient.get(url)
      .pipe(map((response: User) => {
          this.user = response;
        return response;
    }));
  }
  getUserByUsername(username: string) {
    const url = `${this.userUrl.getUserByUsername}?username=${username}`;
    return this.httpClient.get(url)
      .pipe(map((response: User) => {
        this.user = response;
        return response;
    }));
  }

  updateUser(user: User) {
    const url = this.userUrl.base;
    return this.httpClient.put(url, user)
      .pipe(map((response: any) => response));
  }

  getAllRoles() {
    const url = this.userUrl.getAllRoles;
    return this.httpClient.get(url)
      .pipe(map((response: any) => response.result));
  }

  deleteUser(username: string) {
    const url = `${this.userUrl.deleteUser}?username=${username}`;
    return this.httpClient.delete(url)
    .pipe(map((response) => response));
  }
}
