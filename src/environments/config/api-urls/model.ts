export class ApiURLs {
  auth: AuthURLs;
  user: UserURLs;
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

interface ArticleURLs {
  base: string;
  getArticleByName?: string;
  getArticleByArticleId?: string;  
  deleteArticle?: string;
}

interface MeasurementUnitURLs {
  base: string;
  getMeasurementUnitByName?: string;
  getMeasurementUnitByMeasurementUnitId?: string;  
  deleteMeasurementUnit?: string;
}


