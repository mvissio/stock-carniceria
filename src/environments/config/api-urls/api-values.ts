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
  operation: {
    base: 'API_VERSION/operation',
    getOperationById: '/id',
    getOperationsByPaymentMethod: '/paymentMethod',
    getOperationsByCreateDate: '/creationDate',
    getOperationsByTypeAndDate: '/type',
    getAllOperationTypes: '/operationTypes',
    getAllPaymentMethods: '/paymentMethods',
    cancelOperation: '/cancel/id'
  },
  OperationDetail: {
    base: 'API_VERSION/operationDetail',
    getOperationDetailsByOperationId: '/operationId'
  },
  article: {
    base: 'API_VERSION/articles',
    getAllArticlesNotPagging: '/all',
    getArticleByArticleId: '/id',
    getArticleByName: '/name',
    getArticleByNameLike: '/nameLike',
    getAllMeasurementUnits: '/measurementUnits',
    deleteArticle: '/id'
  },
  measurementUnit: {
    base: 'API_VERSION/measurementUnits',
    getMeasurementUnitByMeasurementUnitId: '/id',
    deleteMeasurementUnit: '/id'
  },
  box: {
    base: 'API_VERSION/boxs'
  }

};
