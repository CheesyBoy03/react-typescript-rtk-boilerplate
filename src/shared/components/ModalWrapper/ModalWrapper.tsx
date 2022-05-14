import React, { FC, ReactElement } from 'react';
import { Modal } from 'antd';
import { ModalProps } from 'antd/lib/modal/Modal';

interface IProps extends ModalProps {
  confirmLoading?: boolean;
  formName?: string;
  okButtonDisabled?: boolean;
}

export const ModalWrapper: FC<IProps> = ({
  confirmLoading,
  formName,
  okButtonDisabled,
  onCancel,
  ...props
}): ReactElement => {
  return (
    <Modal
      centered
      closable={!confirmLoading}
      maskClosable={!confirmLoading}
      confirmLoading={confirmLoading}
      width={608}
      cancelButtonProps={{
        disabled: confirmLoading,
      }}
      okButtonProps={{
        form: formName,
        htmlType: formName ? 'submit' : 'button',
        disabled: okButtonDisabled,
      }}
      destroyOnClose={true}
      maskTransitionName=""
      onCancel={confirmLoading ? undefined : onCancel}
      {...props}
    />
  );
};
