import {Injectable} from '@angular/core';
import {CommonsService} from '../commons.service';
import {map} from 'rxjs/operators';
import {DataInfoContentInterface} from '../../interfaces/models.interface';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private http: HttpClient) {
  }

  getCommonsInfo(): Observable<DataInfoContentInterface[]> {
    return this.http.get('http://www.mocky.io/v2/5caa6ceb300000570090458a')
      .pipe(map((resp: any) => resp.data));
  }
}
