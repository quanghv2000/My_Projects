import { notification } from 'antd';

export const openNotificationWithIcon = (type: any) => {
  notification[type]({
    message: 'Hệ thống đang xảy ra lỗi',
    description: 'Vui lòng thử lại sau',
  });
};
