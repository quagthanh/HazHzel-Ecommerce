export interface IRequest {
  url: string;
  method: string;
  body?: { [key: string]: any };
  queryParams?: any;
  useCredentials?: boolean;
  headers?: any;
  nextOption?: any;
}

export interface IBackendRes<T> {
  error?: string | string[];
  message: string;
  statusCode: number | string;
  data?: T;
}

export interface IModelPaginate<T> {
  meta: {
    current: number;
    pageSize: number;
    pages: number;
    total: number;
  };
  result: T[];
}

export interface ILogin {
  user: {
    _id: string;
    name: string;
    email: string;
  };
  access_token: string;
}
export type loginDTO = {
  username: string;
  password: string;
};
export interface IUser {
  _id: string;
  name: string;
  email: string;
  roles: any[];
  password?: string;
  createdAt?: string;
  updatedAt?: string;
}
export interface IUserTable {
  _id: string;
  name: string;
  email: string;
  roles: any[];
}
