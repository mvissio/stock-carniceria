import {Injectable} from '@angular/core';
import {map} from 'rxjs/operators';
import {Rol} from '../../models/rol.model';
import {User} from '../../models/user.model';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import * as bcrypt from 'bcryptjs';
import {PageConfig} from '../../models/pageConfig.model';
import {Page} from '../../models/page.model';
import {Box} from '../../models/Box.model';

@Injectable({
  providedIn: 'root'
})
export class BoxsService {
  boxsUrl = environment.apiUrls.box;
  box: Box = new Box();

  constructor(private httpClient: HttpClient) {
  }

  addBox(box: Box) {
    const newBox = Object.assign({}, box);
    const url = this.boxsUrl.base;
    return this.httpClient.post(url, newBox)
      .pipe(map((newBox: any) => newBox));
  }

  getAllBoxs(page: PageConfig) {
    const url = this.boxsUrl.base;
    return this.httpClient.get(`${url}?page=${page.pageNumber}&size=${page.pageSize}&sort=${page.sortName},${page.orderDesc}`)
      .pipe(map((response: Page) => response));
  }
}
