import {Injectable} from '@angular/core';
import {map} from 'rxjs/operators';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
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

  getOperationsPage(boxId: number, page: PageConfig) {
    const url = this.boxsUrl.getOperationsBoxPage;
    return this.httpClient.get(
      `${url}?boxId=${boxId}&page=${page.pageNumber}&size=${page.pageSize}&sort=${page.sortName},${page.orderDesc}`
    )
      .pipe(map((response: Page) => response));
  }

  getOperations(boxId: number) {
    const url = this.boxsUrl.getOperationsBox;
    return this.httpClient.get(
      `${url}?boxId=${boxId}`
    );
  }


  closeBox(box: Box) {
    const boxClose = Object.assign({}, box);
    const url = this.boxsUrl.closeBox;
    return this.httpClient.post(url,  Object.assign({}, boxClose))
      .pipe(map((response: any) => response));
  }
}
