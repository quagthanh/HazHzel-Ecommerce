import { AxiosRequestConfig, Method } from "axios";
import http from "@/utils/axios-server";

export interface IBackendRes<T> {
  statusCode: number;
  message: string;
  data: T | null;
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
  try {
    const res = await http.request<IBackendRes<T>>(config);
    return res as unknown as IBackendRes<T>;
  } catch (error: any) {
    console.error(`API error: ${method}----${url}`, error);
    return {
      statusCode: error.statusCode,
      message: error.message,
      data: null,
    } as IBackendRes<T>;
  }
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
