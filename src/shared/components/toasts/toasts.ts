import { notification } from 'antd';

const placement = 'bottomLeft';

const commonMessages = {
  successTitle: 'Success',
  successMessage: 'Action completed successfully',
  errorTitle: 'Error',
  errorMessage: 'Unknown error',
};

export class Toasts {
  public success(message?: string | React.ReactNode) {
    notification.success({
      message: commonMessages.successTitle,
      description: message || commonMessages.successMessage,
      placement,
    });
  }

  public error(message?: string | React.ReactNode) {
    notification.error({
      message: commonMessages.errorTitle,
      description: message || commonMessages.errorMessage,
      placement,
    });
  }
}

export const toasts = new Toasts();
