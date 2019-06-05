export class ApiURLs {
  auth: AuthURLs;
  user: UserURLs;
  operation: OperationURLs;
  OperationDetail: OperationDetailURLs;
  article: ArticleURLs;
  measurementUnit: MeasurementUnitURLs 
}

interface AuthURLs {
  login: string;
  recoverPassword: string;
}

interface UserURLs {
  base: string;
  getUserByUsername?: string;
  getUserByUserId?: string;
  getAllRoles?: string;
  deleteUser?: string;
}

interface OperationURLs {
  base: string;
  getOperationById?: string;
  getCompleteOperationById?: string;
  getOperationsByPaymentMethod?: string;
  getOperationsByCreateDate?: string;
  getOperationsByDateBetween?: string;
  getOperationsByTypeAndDate?: string;
  cancelOperation?: string;
  getAllOperationTypes?: string;
  getAllPaymentMethods?: string;
}

interface OperationDetailURLs {
  base: string;
  getOperationDetailsByOperationId: string;
}

interface ArticleURLs {
  base: string;
  getAllArticlesNotPagging?: string;
  getArticleByName?: string;
  getArticleByArticleId?: string;
  getArticleByNameLike?: string;  
  deleteArticle?: string;
}

interface MeasurementUnitURLs {
  base: string;
  getMeasurementUnitByName?: string;
  getMeasurementUnitByMeasurementUnitId?: string;  
  deleteMeasurementUnit?: string;
}


