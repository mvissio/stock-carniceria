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
import {Operation} from '../../models/operation.model';

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
      .pipe(map((newBox: Box) => newBox));
  }

  getAllBoxs(page: PageConfig) {
    const url = this.boxsUrl.base;
    return this.httpClient.get(`${url}?page=${page.pageNumber}&size=${page.pageSize}&sort=${page.sortName},${page.orderDesc}`)
      .pipe(map((response: Page) => response));
  }

  getOpenBoxs(page: PageConfig) {
    const url = this.boxsUrl.getOpenBoxs;
    return this.httpClient.get(`${url}?page=${page.pageNumber}&size=${page.pageSize}&sort=${page.sortName},${page.orderDesc}`)
      .pipe(map((response: Page) => response));
  }

  checkOpenBox() {
    const url = this.boxsUrl.getOpenBoxs;
    return this.httpClient.get(url)
      .pipe(map((response: Array<Box>) => response));
  }

  getOperations(boxId: number, page: PageConfig) {
    const url = this.boxsUrl.getOperationsBox;
    return this.httpClient.get(
      `${url}?boxId=${boxId}&page=${page.pageNumber}&size=${page.pageSize}&sort=${page.sortName},${page.orderDesc}`
    )
      .pipe(map((response: Page) => response));
  }

  closeBox(box: Box) {
    const boxClose = Object.assign({}, box);
    const url = this.boxsUrl.closeBox;
    return this.httpClient.post(url,  Object.assign({}, boxClose))
      .pipe(map((response: any) => response));
  }
}
