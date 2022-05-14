import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from 'axios';
import { RequestData } from '../../types/request';
import { ResponseApiError } from '../../types/response';

export abstract class BaseApiService {
  private readonly axiosInstance: AxiosInstance;

  protected constructor(config: AxiosRequestConfig) {
    this.axiosInstance = axios.create(config);
  }

  public setBaseUrl(url: string) {
    this.axiosInstance.defaults.baseURL = url;
  }

  protected request<T>(options: AxiosRequestConfig): Promise<RequestData<T>> {
    return this.axiosInstance.request(options).then(
      response => Promise.resolve(response.data),
      error => Promise.reject(this.formatError(error)),
    );
  }

  private formatError = (error: AxiosError): ResponseApiError => {
    return {
      code: error?.code,
      status: error?.response?.status,
      statusText: error?.response?.statusText || 'Unknown error',
      data: error?.response?.data || {},
    };
  };
}
