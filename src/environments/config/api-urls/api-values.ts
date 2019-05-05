import {ApiURLs} from './model';

export const applicationApiUrls: ApiURLs = {
  auth: {
    login: '/API_VERSION/login',
    recoverPassword: '/API_VERSION/recoverPassword'
  },
  user: {
    base: 'API_VERSION/users'
  }
};

// USER_URLS
applicationApiUrls.user.getUserByUsername = `${applicationApiUrls.user.base}/username`,
applicationApiUrls.user.getUserByUserId = `${applicationApiUrls.user.base}/id`,
applicationApiUrls.user.getAllRoles = `${applicationApiUrls.user.base}/roles`,
applicationApiUrls.user.deleteUser = `${applicationApiUrls.user.base}/username`;