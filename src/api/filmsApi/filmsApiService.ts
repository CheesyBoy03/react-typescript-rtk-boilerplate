import { AxiosRequestConfig } from 'axios';

import { RequestData } from 'types/request';
import { ResponseId } from 'types/response';
import { Film, FilmCreateUpdate } from './filmsTypes';
import { FILMS_API } from '../shared/endpoints';
import { BaseApiService } from '../baseApi/BaseApiService';
import { ResponseDataWithPagination } from 'types/response';

export class FilmsApiService extends BaseApiService {
  constructor(config: AxiosRequestConfig = {}) {
    super(config);
  }

  public getFilms(): Promise<RequestData<ResponseDataWithPagination<Film[]>>> {
    return this.request<ResponseDataWithPagination<Film[]>>({
      method: 'get',
      url: `/${FILMS_API}`,
    });
  }

  public getFilm(params: { id: number }): Promise<RequestData<Film>> {
    return this.request<Film>({
      method: 'get',
      url: `/${FILMS_API}/${params.id}`,
    });
  }

  public createFilm(body: FilmCreateUpdate): Promise<RequestData<ResponseId>> {
    return this.request<ResponseId>({
      method: 'post',
      url: `/${FILMS_API}`,
      data: body,
    });
  }

  public updateFilm(
    params: {
      id: number;
    },
    body: FilmCreateUpdate,
  ): Promise<RequestData<ResponseId>> {
    return this.request<ResponseId>({
      method: 'put',
      url: `/${FILMS_API}/${params.id}`,
      data: body,
    });
  }

  public deleteFilm(params: { id: number }): Promise<RequestData<ResponseId>> {
    return this.request<ResponseId>({
      method: 'delete',
      url: `/${FILMS_API}/${params.id}`,
    });
  }
}
