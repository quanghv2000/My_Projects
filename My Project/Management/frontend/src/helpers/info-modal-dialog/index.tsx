import { Modal } from 'antd';

type InfoType = 'info' | 'success' | 'warning' | 'error';

export const showInfoModal = (
  type: InfoType,
  content: string,
  title?: string,
) => {
  let defaultTitle = '';

  switch (type) {
    case 'info':
      defaultTitle = 'Thông tin';
      break;
    case 'success':
      defaultTitle = 'Thành công';
      break;
    case 'warning':
      defaultTitle = 'Cảnh báo';
      break;
    case 'error':
      defaultTitle = 'Có lỗi xảy ra';
      break;

    default:
      break;
  }

  Modal[type]({
    title: title ?? defaultTitle,
    content,
    okText: 'Đóng',
  });
};
