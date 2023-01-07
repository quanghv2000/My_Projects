import { message } from 'antd';

export const success = (title: string) => {
  message.success({
    content: title,
    className: 'custom-class',
  });
};
