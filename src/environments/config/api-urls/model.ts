export class ApiURLs {
  auth: AuthURLs;
  user: UserURLs;
  article: ArticleURLs;
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

