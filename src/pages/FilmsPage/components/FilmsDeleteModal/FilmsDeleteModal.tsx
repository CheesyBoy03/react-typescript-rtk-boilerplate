import React, { FC, ReactElement, useEffect, memo } from 'react';
import { useDispatch } from 'react-redux';

import { swapi } from 'store';
import { ModalWrapper } from 'shared/components';
import { deleteFilmThunk } from 'store/swapi/thunks';
import { useShallowEqualSelector } from 'shared/utils';

type Props = {
  isOpen: boolean;
  id?: number;
  title?: string;
  refreshTableData: () => void;
  close: () => void;
};

export const FilmsDeleteModal: FC<Props> = memo(
  ({ isOpen, id, title, refreshTableData, close }): ReactElement => {
    const dispatch = useDispatch();

    const deleteRequestState = useShallowEqualSelector(
      swapi.deleteFilm.selector.state,
    );

    useEffect(() => {
      if (deleteRequestState.isFetched) {
        close();
        refreshTableData();
      }
    }, [deleteRequestState.isFetched, close, refreshTableData]);

    const onDelete = () => {
      if (typeof id !== 'number') return;
      dispatch(deleteFilmThunk(id));
    };

    const resetState = () => {
      dispatch(swapi.deleteFilm.action.reset());
    };

    return (
      <ModalWrapper
        title={`Delete the selected film '${title}'?`}
        visible={isOpen}
        onOk={onDelete}
        onCancel={close}
        okText="Delete"
        cancelText="Cancel"
        confirmLoading={deleteRequestState.isFetching}
        afterClose={resetState}
      />
    );
  },
);
