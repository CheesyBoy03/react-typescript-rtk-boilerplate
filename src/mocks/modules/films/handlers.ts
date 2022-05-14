import { rest } from 'msw';
import { maxBy } from 'lodash-es';

import { res } from '../../res';
import { FILMS_API } from 'api/shared/endpoints';
import { ResponseId, ResponseDataWithPagination } from 'types/response';
import { Film, FilmCreateUpdate } from 'api/filmsApi';
import { store } from '../../store';
import { errors } from '../../messages';
import { ApiError } from '../../types';

const entityName = 'Films';

const getFilms = rest.get(`/${FILMS_API}`, (req, _, ctx) => {
  return res(
    ctx.status(200),
    ctx.json<ResponseDataWithPagination<Film[]>>({
      count: store.films.length,
      results: store.films,
    }),
  );
});

const getFilm = rest.get(`/${FILMS_API}/:id`, (req, _, ctx) => {
  const id: number = parseInt(req.params.id, 10);

  const film = store.films.find(f => f.id === id);

  if (film) {
    return res(ctx.status(200), ctx.json<Film>(film));
  }

  return res(
    ctx.status(404),
    ctx.json<ApiError>({
      message: errors.notFound(entityName, id),
    }),
  );
});

const createFilm = rest.post<FilmCreateUpdate>(
  `/${FILMS_API}`,
  (req, _, ctx) => {
    const data = req.body;

    const lastId = maxBy(store.films, 'id')?.id ?? 0;

    const nextId = lastId + 1;

    store.films.push({
      id: nextId,
      ...data,
      episode_id: 0,
      release_date: '',
      planets: [],
    });

    return res(
      ctx.status(201),
      ctx.json<ResponseId>({ id: nextId }),
    );
  },
);

const updateFilm = rest.put<FilmCreateUpdate>(
  `/${FILMS_API}/:id`,
  (req, _, ctx) => {
    const id: number = parseInt(req.params.id, 10);
    const data = req.body;

    const filmIndex = store.films.findIndex(f => f.id === id);

    if (filmIndex !== -1) {
      store.films[filmIndex] = {
        ...store.films[filmIndex],
        ...data,
      };

      return res(
        ctx.status(200),
        ctx.json<ResponseId>({ id }),
      );
    }

    return res(
      ctx.status(404),
      ctx.json<ApiError>({
        message: errors.notFound(entityName, id),
      }),
    );
  },
);

const deleteFilm = rest.delete(`/${FILMS_API}/:id`, (req, _, ctx) => {
  const id: number = parseInt(req.params.id, 10);

  const filmIndex = store.films.findIndex(f => f.id === id);

  if (filmIndex !== -1) {
    store.films.splice(filmIndex, 1);

    return res(
      ctx.status(200),
      ctx.json<ResponseId>({ id }),
    );
  }

  return res(
    ctx.status(404),
    ctx.json<ApiError>({
      message: errors.notFound(entityName, id),
    }),
  );
});

export const filmsHandlers = [
  getFilms,
  getFilm,
  createFilm,
  updateFilm,
  deleteFilm,
];
