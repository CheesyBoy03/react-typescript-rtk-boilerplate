import React, { FC, ReactElement, useEffect, memo } from 'react';
import { useDispatch } from 'react-redux';

import { Film, FilmCreateUpdate } from 'api/filmsApi';
import { swapi } from 'store';
import { ModalWrapper } from 'shared/components';
import { createFilmThunk } from 'store/swapi/thunks';
import { FilmsForm } from '../FilmsForm';
import { useShallowEqualSelector } from 'shared/utils';

type Props = {
  isOpen: boolean;
  close: () => void;
  refreshTableData: () => void;
};

const initialFormValues: Pick<Film, 'opening_crawl'> = {
  opening_crawl: '',
};

export const FilmsCreateModal: FC<Props> = memo(
  ({ isOpen, close, refreshTableData }): ReactElement => {
    const dispatch = useDispatch();

    const createRequestState = useShallowEqualSelector(
      swapi.createFilm.selector.state,
    );

    useEffect(() => {
      if (createRequestState.isFetched) {
        close();
        refreshTableData();
      }
    }, [createRequestState.isFetched, close, refreshTableData]);

    const createFilm = (data: FilmCreateUpdate) => {
      dispatch(createFilmThunk(data));
    };

    const resetState = () => {
      dispatch(swapi.createFilm.action.reset());
    };

    return (
      <ModalWrapper
        title="New Film"
        visible={isOpen}
        onCancel={close}
        okText="Create"
        cancelText="Cancel"
        afterClose={resetState}
        confirmLoading={createRequestState.isFetching}
        formName="filmsForm"
      >
        <FilmsForm
          initialValues={initialFormValues}
          onSubmit={createFilm}
          submitError={createRequestState.error?.data?.message}
        />
      </ModalWrapper>
    );
  },
);
