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
    getCompleteOperationById: '/complete/id',
    getOperationByPaymentMethod: '/paymentMethod',
    getOperationByCreateDate: '/date',
    getOperationByTypeAndDate: '/type',
    cancelOperation: '/cancel/id' 
  },
  OperationDetail: {
    base: 'API_VERSION/operationDetail',
    getOperationDetailsByOperationId: '/operationId'
  }
};
