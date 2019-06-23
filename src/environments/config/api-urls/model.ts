export class ApiURLs {
  auth: AuthURLs;
  user: UserURLs;
  operation: OperationURLs;
  OperationDetail: OperationDetailURLs;
  article: ArticleURLs;
  measurementUnit: MeasurementUnitURLs;
  category: CategoryURLs;
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
  getOperationsByPaymentMethod?: string;  
  getOperationsByDateBetween?: string;
  getOperationsByTypeAndDate?: string;
  
  getOperationsByOneDate?: string;  
  getOperationsByOneDateAndPaymentMethod?: string;
  getOperationsByOneDateAndOperationType?: string;  
  getOperationsByOneDateAndOperationTypeAndPaymentMethod?:string;
  
  getOperationsByPeriod?: string;
  getOperationsByPeriodAndPaymentMethod;
  getOperationsByPeriodAndOperationType;
  getOperationsByPeriodAndOperationTypeAndPaymentMethod;
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
  getAllMeasurementUnits?: string;
  deleteArticle?: string;
}

interface MeasurementUnitURLs {
  base: string;
  getMeasurementUnitByName?: string;
  getMeasurementUnitByMeasurementUnitId?: string;  
  deleteMeasurementUnit?: string;
}

interface CategoryURLs {
  base: string;
  getCategoryByName?: string;
  getCategoryByCategoryId?: string;  
  deleteCategory?: string;  
}


