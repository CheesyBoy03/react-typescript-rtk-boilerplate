export interface ResponseDataWithPagination<T> {
  count: number;
  results: T;
}

export interface ResponseApiError {
  code?: string;
  status?: number;
  statusText: string;
  data: any;
}

export type ResponseId = {
  id: number;
};
