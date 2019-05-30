import {ApiURLs} from './model';

export const applicationApiUrls: ApiURLs = {
  auth: {
    login: '/API_VERSION/login',
    recoverPassword: '/API_VERSION/recoverPassword'
  },
  user: {
    base: 'API_VERSION/users',
    getUserByUsername: '/username',
    getUserByUserId: '/id',
    getAllRoles: '/roles',
    deleteUser: '/username'
  },
  article: {
    base:'API_VERSION/articles',
    getArticleByArticleId: '/id',
    deleteArticle: '/id'
  },
  measurementUnit:{
    base:'API_VERSION/measurementUnits',
    getMeasurementUnitByMeasurementUnitId: '/id',
    deleteMeasurementUnit: '/id'
  }

};
