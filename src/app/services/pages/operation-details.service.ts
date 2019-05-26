import { Injectable } from '@angular/core';
import { OperationDetail } from '../../models/operationDetail.model';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OperationDetailsService {

  operationDetailUrl = environment.apiUrls.OperationDetail;
  operationDetails: OperationDetail[] = [];

  constructor(private httpClient: HttpClient) { }

  getOperationDetailsByOperationId(id: number) {
    const url = `${this.operationDetailUrl.getOperationDetailsByOperationId}?operationId=${id}`;
    return this.httpClient.get(url)
      .pipe(map((response: OperationDetail) => {
        this.operationDetails.push(response);
        return response;
    }));
  }
}
