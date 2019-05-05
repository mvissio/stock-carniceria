export class ApiURLs {
  auth: AuthURLs;
  user: UserURLs;
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

