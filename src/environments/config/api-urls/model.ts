export class ApiURLs {
  auth: AuthURLs;
  user: UserURLs;
  operation: OperationURLs;
  OperationDetail: OperationDetailURLs;
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
  getOperationByPaymentMethod?: string;
  getOperationByCreateDate?: string;
  getOperationByDateBetween?: string;
  getOperationByTypeAndDate?: string;
  cancelOperation?: string;
  getAllOperationTypes?: string;
  getAllPaymentMethods?: string;
}

interface OperationDetailURLs {
  base: string;
  getOperationDetailsByOperationId: string;
}

