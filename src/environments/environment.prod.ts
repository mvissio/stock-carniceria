import { Environment, ICustomEnvironment } from "./config";

export const prodEnvironment: ICustomEnvironment = {
  production: true,
  apiUrl: 'http://localhost:8080/StockCustom',
  apiVersion: ''
};

export const environment = new Environment(prodEnvironment);
