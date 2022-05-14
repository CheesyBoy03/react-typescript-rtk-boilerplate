import React, { FC, ReactElement, memo } from 'react';
import { Table, Space, Button } from 'antd';

import { swapi } from 'store';
import { useShallowEqualSelector } from 'shared/utils';
import { Film } from 'api/filmsApi';

type Props = {
  openDeleteModal: (film: Film, id: number) => void;
  openEditModal: (film: Film, id: number) => void;
};

export const FilmsDataTable: FC<Props> = memo(
  ({ openDeleteModal, openEditModal }): ReactElement => {
    const { isFetching, data } = useShallowEqualSelector(
      swapi.getFilms.selector.state,
    );

    return (
      <Table
        dataSource={data?.results || []}
        className="custom-ant-table"
        rowKey="episode_id"
        loading={isFetching}
      >
        <Table.Column title="Episode" dataIndex="episode_id" />
        <Table.Column title="Title" dataIndex="title" />
        <Table.Column title="Director" dataIndex="director" />
        <Table.Column title="Producer" dataIndex="producer" />
        <Table.Column title="Release Date" dataIndex="release_date" />
        <Table.Column
          title="Planets"
          dataIndex="planets"
          render={(planets: string[]) => planets.slice(0, 3).join(', ')}
        />
        <Table.Column
          key="actions"
          render={(_, film: Film, index) => (
            <Space size="middle">
              <Button
                type="link"
                onClick={() => openEditModal(film, index + 1)}
                children="Edit"
              />
              <Button
                type="link"
                onClick={() => openDeleteModal(film, index + 1)}
                children="Delete"
              />
            </Space>
          )}
        />
      </Table>
    );
  },
);
