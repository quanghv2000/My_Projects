import { NotificationManager } from 'react-notifications';

type NotificationType = 'info' | 'success' | 'warning' | 'error';

export const showInfoModal = (type: NotificationType, message?: string, title?: string) => {
  switch (type) {
    case 'info':
      NotificationManager.info(message ?? 'Info message', title ?? 'Info');
      break;
    case 'success':
      NotificationManager.success(message ?? 'Success message', title ?? 'Success');
      break;
    case 'warning':
      NotificationManager.warning(message ?? 'Warning message', title ?? 'Warning');
      break;
    case 'error':
      NotificationManager.error(message ?? 'Error message', title ?? 'Error');
      break;
    default:
      break;
  }
};
