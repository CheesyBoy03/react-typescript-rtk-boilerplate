import { AxiosResponse } from 'axios';

export type RequestData<T> = AxiosResponse<T>['data'];
