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

  getAllOperation(page: PageConfig) {
    const url = this.operationUrl.base;
    return this.httpClient.get(`${url}?page=${page.pageNumber}&size=${page.pageSize}&sort=${page.sortName},${page.orderDesc}`)
      .pipe(map((response: Page) => response));
  }

  getOperationById(id: number) {
    const url = `${this.operationUrl.getOperationById}?id=${id}`;
    return this.httpClient.get(url)
      .pipe(map((response: Operation) => {
          this.operation = response;
        return response;
    }));
  }
  getOperationCompleteById(id: number) {
    const url = `${this.operationUrl.getCompleteOperationById}?id=${id}`;
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

  cancelOperation(operationId: number) {
    const url = `${this.operationUrl.cancelOperation}?operationId=${operationId}`;
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
