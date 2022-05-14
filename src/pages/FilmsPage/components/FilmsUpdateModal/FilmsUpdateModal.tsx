import React, { FC, ReactElement, useEffect, memo } from 'react';
import { useDispatch } from 'react-redux';
import { Alert, Spin } from 'antd';

import { FilmCreateUpdate } from 'api/filmsApi';
import { swapi } from 'store';
import { ModalWrapper } from 'shared/components';
import { getFilmThunk, updateFilmThunk } from 'store/swapi/thunks';
import { FilmsForm } from '../FilmsForm';
import { useShallowEqualSelector } from 'shared/utils';

type Props = {
  isOpen: boolean;
  id?: number;
  close: () => void;
  refreshTableData: () => void;
};

export const FilmsUpdateModal: FC<Props> = memo(
  ({ isOpen, id, close, refreshTableData }): ReactElement => {
    const dispatch = useDispatch();

    const initialValuesRequestState = useShallowEqualSelector(
      swapi.getFilm.selector.state,
    );

    const updateRequestState = useShallowEqualSelector(
      swapi.updateFilm.selector.state,
    );

    useEffect(() => {
      if (isOpen && typeof id === 'number') {
        dispatch(getFilmThunk(id));
      }
    }, [dispatch, isOpen, id]);

    useEffect(() => {
      if (updateRequestState.isFetched) {
        close();
        refreshTableData();
      }
    }, [updateRequestState.isFetched, close, refreshTableData]);

    const updateFilm = (data: FilmCreateUpdate) => {
      if (typeof id === 'number') {
        dispatch(updateFilmThunk(id, data));
      }
    };

    const resetState = () => {
      dispatch(swapi.getFilm.action.reset());
      dispatch(swapi.updateFilm.action.reset());
    };

    return (
      <ModalWrapper
        title="Edit Film"
        visible={isOpen}
        onCancel={close}
        okText="Save"
        cancelText="Cancel"
        afterClose={resetState}
        confirmLoading={updateRequestState.isFetching}
        formName="filmsForm"
        okButtonDisabled={!initialValuesRequestState.isFetched}
      >
        {initialValuesRequestState.isFetching && <Spin />}
        {initialValuesRequestState.error && (
          <Alert
            message={initialValuesRequestState.error.data?.message}
            type="error"
            showIcon
          />
        )}
        {initialValuesRequestState.isFetched &&
          initialValuesRequestState.data && (
            <FilmsForm
              initialValues={initialValuesRequestState.data}
              onSubmit={updateFilm}
              submitError={updateRequestState.error?.data?.message}
            />
          )}
      </ModalWrapper>
    );
  },
);
