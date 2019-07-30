import {Injectable} from '@angular/core';
import {MeasurementUnit} from '../../models/measurement-unit.model';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {environment} from '../../../environments/environment';
import {PageConfig} from '../../models/pageConfig.model';
import {Page} from '../../models/page.model';


@Injectable({
  providedIn: 'root'
})
export class MeasurementUnitService {

  measurementUnitUrl = environment.apiUrls.measurementUnit;
  measurementUnit: MeasurementUnit = new MeasurementUnit();

  constructor(private httpClient: HttpClient) {
  }

  addMeasurementUnit(measurementUnit: MeasurementUnit) {
    let newMeasurementUnit = Object.assign({}, measurementUnit);
    newMeasurementUnit.createDate = new Date();
    const url = this.measurementUnitUrl.base;
    return this.httpClient.post(url, newMeasurementUnit)
      .pipe(map((newMeasurementUnit: any) => newMeasurementUnit));
  }

  getAllMeasurementUnits(page: PageConfig) {
    const url = this.measurementUnitUrl.base;
    return this.httpClient.get(`${url}?page=${page.pageNumber}&size=${page.pageSize}&sort=${page.sortName},${page.orderDesc}`)
      .pipe(map((response: Page) => response));
  }

  getMeasurementUnitByMeasurementUnitId(id: number) {
    const url = `${this.measurementUnitUrl.getMeasurementUnitByMeasurementUnitId}/${id}`;
    return this.httpClient.get(url)
      .pipe(map((response: MeasurementUnit) => {
        this.measurementUnit = response;
        return response;
      }));
  }

  getMeasurementUnitByname(name: string, page: PageConfig) {
    const url = `${this.measurementUnitUrl.getMeasurementUnitByName}?name=${name}&page=${page.pageNumber}&size=${page.pageSize}&sort=${page.sortName},${page.orderDesc}`;
    return this.httpClient.get(url)
      .pipe(map((response: Page) => response));
  }

  updateMeasurementUnit(measurementUnit: MeasurementUnit) {
    const url = this.measurementUnitUrl.base;
    return this.httpClient.put(url, measurementUnit)
      .pipe(map((response: any) => response));
  }

  enabledMeasurementUnit(id: number) {
    const url = `${this.measurementUnitUrl.enabledMeasurementUnit}/${id}`;
    return this.httpClient.patch(url, false)
      .pipe(map((response) => response));
  }

  deleteMeasurementUnit(id: number) {
    const url = `${this.measurementUnitUrl.deleteMeasurementUnit}/${id}`;
    return this.httpClient.delete(url)
      .pipe(map((response) => response));
  }

}
