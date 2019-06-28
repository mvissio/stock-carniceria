import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Operation } from '../../models/operation.model';
import { map } from 'rxjs/operators';
import { PageConfig } from '../../models/pageConfig.model';
import { Page } from '../../models/page.model';

@Injectable({
  providedIn: 'root'
})
export class OperationsService {

  operationUrl = environment.apiUrls.operation;
  operation: Operation = new Operation();

  constructor(private httpClient: HttpClient) { }

  addOperation(operation: Operation) {
    let newOperation = Object.assign({}, operation);
    const url = this.operationUrl.base;
    return this.httpClient.post(url, newOperation)
      .pipe(map((newOperation: any) => newOperation));
  }

  //consulta por la fecha de hoy
  getOperationsByTodayCreateDate(page: PageConfig) {
    const url = this.operationUrl.getOperationsByOneDate;
    return this.httpClient.get(`${url}?creationDate=${new Date()}&page=${page.pageNumber}&size=${page.pageSize}&sort=${page.sortName},${page.orderDesc}`)
      .pipe(map((response: Page) => response));
  }

  //consulta por la fecha pasada como parametro
  getOperationsByCreateDate(page: PageConfig, createDate: Date, path: string, operationTypeOneDate: string, paymentMethodOneDate: string) {
    const url = this.operationUrl[path];
    let urlComplete = `${url}?creationDate=${createDate}&page=${page.pageNumber}&size=${page.pageSize}`;
    if(operationTypeOneDate == null && paymentMethodOneDate == null){
      return this.httpClient.get(urlComplete)
      .pipe(map((response: Page) => response));
    }
    else if (operationTypeOneDate != null && paymentMethodOneDate != null) {
      urlComplete = urlComplete.concat(`&operationType=${operationTypeOneDate}`).concat(`&paymentMethod=${paymentMethodOneDate}`);
      return this.httpClient.get(urlComplete)
        .pipe(map((response: Page) => response));
    } else if (operationTypeOneDate != null) {
      urlComplete = urlComplete.concat(`&operationType=${operationTypeOneDate}`);
      return this.httpClient.get(urlComplete)
        .pipe(map((response: Page) => response));
    } else if (paymentMethodOneDate != null) {
      urlComplete = urlComplete.concat(`&paymentMethod=${paymentMethodOneDate}`);
      return this.httpClient.get(urlComplete)
        .pipe(map((response: Page) => response));
    }

  }

  //consulto por un periodo de fechas, tipo de pago y tipo de operación
  getOperationsByPeriod(fromDate: Date, toDate: Date, page: PageConfig, path: string, operationTypePeriod: string, paymentMethodPeriod: string ) {
    const url = this.operationUrl[path];
    let urlComplete = `${url}?fromDate=${fromDate}&toDate=${toDate}&page=${page.pageNumber}&size=${page.pageSize}`;
    if(operationTypePeriod == null && paymentMethodPeriod == null){
      return this.httpClient.get(urlComplete)
      .pipe(map((response: Page) => response));
    }else if (operationTypePeriod != null && paymentMethodPeriod != null) {
      urlComplete = urlComplete.concat(`&operationType=${operationTypePeriod}`).concat(`&paymentMethod=${paymentMethodPeriod}`);
      return this.httpClient.get(urlComplete)
        .pipe(map((response: Page) => response));
    } else if (operationTypePeriod != null) {
      urlComplete = urlComplete.concat(`&operationType=${operationTypePeriod}`);
      return this.httpClient.get(urlComplete)
        .pipe(map((response: Page) => response));
    } else if (paymentMethodPeriod != null) {
      urlComplete = urlComplete.concat(`&paymentMethod=${paymentMethodPeriod}`);
      return this.httpClient.get(urlComplete)
        .pipe(map((response: Page) => response));
    }
  }

  getOperationsByOperationType(page: PageConfig) {
    const url = this.operationUrl.getOperationsByOneDate;
    return this.httpClient.get(`${url}?creationDate=${new Date()}&page=${page.pageNumber}&size=${page.pageSize}&sort=${page.sortName},${page.orderDesc}`)
      .pipe(map((response: Page) => response));
  }

  getOperationById(id: number) {
    const url = `${this.operationUrl.getOperationById}/${id}`;
    return this.httpClient.get(url)
      .pipe(map((response: Operation) => {
        this.operation = response;
        return response;
      }));
  }

  updateOperation(operation: Operation) {
    const url = this.operationUrl.base;
    return this.httpClient.put(url, operation)
      .pipe(map((response: any) => response));
  }

  cancelOperation(id: number) {
    const url = `${this.operationUrl.cancelOperation}/${id}`;
    return this.httpClient.delete(url)
      .pipe(map((response) => response));
  }

  getAllOperationTypes() {
    const url = this.operationUrl.getAllOperationTypes;
    return this.httpClient.get(url)
      .pipe(map((response: any) => response));
  }

  getAllPaymentMethods() {
    const url = this.operationUrl.getAllPaymentMethods;
    return this.httpClient.get(url)
      .pipe(map((response: any) => response));
  }
}
