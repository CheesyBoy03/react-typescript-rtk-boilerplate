import { useEffect, useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { cloneDeep } from 'lodash-es';

import { swapi } from 'store';
import { Film } from 'api/filmsApi';
import { getFilmsThunk } from 'store/swapi/thunks';
import { Create, Update, Delete } from 'types/modals';

type AvailableModals = Create | Update | Delete;

export const useFilmsPage = () => {
  const dispatch = useDispatch();
  const [refreshToken, setRefreshToken] = useState(uuidv4());
  const [modalOpened, setModalOpened] = useState<AvailableModals>();
  const [filmCopy, setFilmCopy] = useState<Film>();

  const openCreateModal = useCallback(() => {
    setModalOpened('create');
  }, []);

  const openEditModal = useCallback((film: Film, id) => {
    setFilmCopy({ ...cloneDeep(film), id });
    setModalOpened('edit');
  }, []);

  const openDeleteModal = useCallback((film: Film, id) => {
    setFilmCopy({ ...cloneDeep(film), id });
    setModalOpened('delete');
  }, []);

  const closeModal = useCallback(() => {
    setModalOpened(undefined);
  }, []);

  const refreshTableData = useCallback(() => {
    setRefreshToken(uuidv4());
  }, []);

  useEffect(() => {
    dispatch(getFilmsThunk());
  }, [dispatch, refreshToken]);

  useEffect(
    () => () => {
      dispatch(swapi.getFilms.action.reset());
    },
    [dispatch],
  );

  return {
    modalOpened,
    filmCopy,
    refreshTableData,
    openCreateModal,
    openEditModal,
    openDeleteModal,
    closeModal,
  };
};
