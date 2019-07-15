import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Rol } from '../../models/rol.model';
import { User } from '../../models/user.model';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import * as bcrypt from 'bcryptjs';
import {PageConfig} from '../../models/pageConfig.model';
import { Page } from '../../models/page.model';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  userUrl = environment.apiUrls.user;
  user: User = new User();
  roles: Rol[] = [];
  rolesSelected: Rol[] = [];

  constructor( private httpClient: HttpClient) { }

  addUser(user: User) {
    const newUser = Object.assign({}, user);
    newUser.enabled = true;
    newUser.password = bcrypt.hashSync(newUser.password, 10);
    const url = this.userUrl.base;
    return this.httpClient.post(url, newUser)
      .pipe(map((newUser: any) => newUser));
  }

  getAllUsers(page: PageConfig) {
    const url = this.userUrl.base;
    return this.httpClient.get(`${url}?page=${page.pageNumber}&size=${page.pageSize}&sort=${page.sortName},${page.orderDesc}`)
      .pipe(map((response: Page) => response));
  }

  getAllRoles() {
    const url = this.userUrl.getAllRoles;
    return this.httpClient.get(url)
      .pipe(map((response: any) => response));
  }

  getUserByUserId(id: number) {
    const url = `${this.userUrl.getUserByUserId}?id=${id}`;
    return this.httpClient.get(url)
      .pipe(map((response: User) => {
          this.user = response;
        return response;
    }));
  }
  getUserByUsername(username: string, page: PageConfig) {
    const url = `${this.userUrl.getUserByUsername}?username=${username}&page=${page.pageNumber}&size=${page.pageSize}&sort=${page.sortName},${page.orderDesc}`;
    return this.httpClient.get(url)
      .pipe(map((response: Page) => response));
  }

  updateUser(user: User) {
    const url = this.userUrl.base;
    return this.httpClient.put(url, user)
      .pipe(map((response: any) => response));
  }

  

  deleteUser(username: string) {
    const url = `${this.userUrl.deleteUser}?username=${username}`;
    return this.httpClient.delete(url)
    .pipe(map((response) => response));
  }
}
