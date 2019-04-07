import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CommonsService {

  constructor(private _http: HttpClient) {
  }

  getHttpClient(): HttpClient {
    return this._http;
  }
}
