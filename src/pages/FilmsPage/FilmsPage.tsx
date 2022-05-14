import React, { FC, ReactElement } from 'react';
import { Button } from 'antd';

import { useFilmsPage } from './useFilmsPage';
import { useBem } from 'shared/hooks';
import {
  FilmsCreateModal,
  FilmsDataTable,
  FilmsUpdateModal,
  FilmsDeleteModal,
} from './components';

import './FilmsPage.scss';

export const FilmsPage: FC = (): ReactElement => {
  const bem = useBem('FilmsPage');

  const {
    modalOpened,
    filmCopy,
    refreshTableData,
    openCreateModal,
    openEditModal,
    openDeleteModal,
    closeModal,
  } = useFilmsPage();

  return (
    <div>
      <Button
        className={bem('open-create-modal-btn')}
        type="primary"
        onClick={openCreateModal}
        children="Create"
      />

      <FilmsDataTable
        openDeleteModal={openDeleteModal}
        openEditModal={openEditModal}
      />

      <FilmsCreateModal
        isOpen={modalOpened === 'create'}
        close={closeModal}
        refreshTableData={refreshTableData}
      />

      <FilmsUpdateModal
        isOpen={modalOpened === 'edit'}
        id={filmCopy?.id}
        close={closeModal}
        refreshTableData={refreshTableData}
      />

      <FilmsDeleteModal
        isOpen={modalOpened === 'delete'}
        id={filmCopy?.id}
        title={filmCopy?.title}
        close={closeModal}
        refreshTableData={refreshTableData}
      />
    </div>
  );
};
