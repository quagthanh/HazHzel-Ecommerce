import { AxiosRequestConfig, Method } from "axios";
import http from "@/utils/axios-server";

export interface IBackendRes<T> {
  statusCode: number;
  message: string;
  data: T;
}

interface IRequest {
  url: string;
  method: Method;
  body?: any;
  queryParams?: any;
  accessToken?: string;
  headers?: any;
  useCache?: boolean;
}
//for json req
export const sendRequest = async <T>(
  props: IRequest,
): Promise<IBackendRes<T>> => {
  const {
    url,
    method,
    body,
    queryParams,
    accessToken,
    headers = {},
    useCache = false,
  } = props;

  const config: AxiosRequestConfig = {
    url,
    method,
    params: queryParams,
    data: body,
    headers: {
      ...headers,
      Authorization: accessToken ? `Bearer ${accessToken}` : undefined,
    },
  };

  if (!useCache && (method === "GET" || method === "get")) {
    config.headers = {
      ...config.headers,
    };
  }
  const res = await http.request<IBackendRes<T>>(config);
  return res as unknown as IBackendRes<T>;
};
//for form data req
export const sendRequestFile = async <T>(
  props: IRequest,
): Promise<IBackendRes<T>> => {
  const { url, method, body, queryParams, accessToken, headers = {} } = props;

  const config: AxiosRequestConfig = {
    url,
    method,
    params: queryParams,
    data: body,
    headers: {
      ...headers,
      Authorization: accessToken ? `Bearer ${accessToken}` : undefined,
      "Content-Type": undefined,
    },
  };

  const res = await http.request<IBackendRes<T>>(config);
  return res as unknown as IBackendRes<T>;
};
