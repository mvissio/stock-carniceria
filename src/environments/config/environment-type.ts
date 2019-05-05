import { ApiURLs, applicationApiUrls } from '../config/api-urls';

export interface ICustomEnvironment {
  production: boolean;
  apiUrl: string;
  apiVersion: string;
}

export class Environment implements ICustomEnvironment {
  production = false;
  apiUrl: string;
  apiVersion: string;
  apiUrls: ApiURLs = <ApiURLs>applicationApiUrls;

  constructor(customEnvironment: ICustomEnvironment) {
    Object.assign(this, customEnvironment);
    this._setApiUrls(this.apiVersion);
  }
  private _setApiUrls(apiVersion: string = 'api') {
    Object.keys(this.apiUrls).forEach(key => {
      const subKey = this.apiUrls[key];
      Object.keys(subKey).forEach(apiSubKey => {
        const apiUrl = (this.apiUrl + subKey[apiSubKey]) as string;
        this.apiUrls[key][apiSubKey] = apiUrl.replace('API_VERSION', apiVersion);
      });
    });
  }
}
