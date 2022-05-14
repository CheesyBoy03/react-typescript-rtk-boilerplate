import React, { FC, ReactElement } from 'react';
import { Form, Alert, Input } from 'antd';

import { CustomizeInput } from 'shared/components';
import { Film, FilmCreateUpdate } from 'api/filmsApi';

type Props = {
  initialValues?: Partial<Film>;
  onSubmit: (data: FilmCreateUpdate) => void;
  submitError?: string;
};

export const FilmsForm: FC<Props> = ({
  initialValues,
  onSubmit,
  submitError,
}): ReactElement => {
  return (
    <>
      <Form
        id="filmsForm"
        name="mainFilmsForm"
        preserve={false}
        initialValues={initialValues}
        onFinish={onSubmit}
      >
        <Form.Item
          name="title"
          rules={[
            {
              required: true,
              message: 'Required field',
            },
          ]}
        >
          <CustomizeInput maxLength={100} label="Title" />
        </Form.Item>

        <Form.Item
          name="director"
          rules={[
            {
              required: true,
              message: 'Required field',
            },
          ]}
        >
          <CustomizeInput maxLength={100} label="Director" />
        </Form.Item>

        <Form.Item
          name="producer"
          rules={[
            {
              required: true,
              message: 'Required field',
            },
          ]}
        >
          <CustomizeInput maxLength={100} label="Producer" />
        </Form.Item>

        <Form.Item name="opening_crawl">
          <Input.TextArea placeholder="Opening crawl" rows={7} />
        </Form.Item>
      </Form>

      {submitError && <Alert message={submitError} type="error" showIcon />}
    </>
  );
};
