import moment from 'moment';
import { Tag, message, Badge } from 'antd';

export const success = (title: string) => {
  message.success({
    content: title,
    className: 'custom-class',
  });
};

export const checkStatus = (data: any) => {
  // status - Đang hiển thị
  if (
    data?.status === 'CENSORED' &&
    moment(data?.endDate) > moment() &&
    moment(data?.startDate) < moment()
  ) {
    return <Tag color="green">Đang hiển thị</Tag>;
  }
  // status - Đã hết hạn
  if (moment(data?.endDate) <= moment() && data?.status === 'CENSORED') {
    return <Tag color="red">Đã hết hạn</Tag>;
  }
  // status - Chờ hiển thị
  if (data?.status === 'CENSORED' && moment(data?.startDate) > moment()) {
    return <Tag color="blue">Chờ hiển thị</Tag>;
  }
  // status  - Chờ kiểm duyệt
  if (data?.status === 'UNCENSORED') {
    return <Tag color="orange">Chờ kiểm duyệt</Tag>;
  }
  // status  - Đã bị huỷ
  if (data?.status === 'REJECTED') {
    return <Tag color="magenta">Đã bị huỷ</Tag>;
  }
  // status - Gỡ bài đăng
  if (data?.status === 'DELETED') {
    return <Tag color="magenta">Gỡ bài đăng</Tag>;
  }
};

export const formatCostPost = (costId, listCost) => {
  let temp: any = '';
  listCost?.map((item: any) => {
    if (item?.id === costId) {
      temp = (
        <div
          style={{ display: 'flex' }}
        >{`${item?.type} - ${item?.price}đ/ngày`}</div>
      );
    }
  });

  return temp;
};

export const statusVerify = (verify: any) => {
  if (verify === 'VERIFIED') {
    return (
      <Badge status="success" text="Đã xác thực" className="ml-10"></Badge>
    );
  }
  if (verify === 'WAITING') {
    return (
      <Badge status="warning" text="Chờ xác thực" className="ml-10"></Badge>
    );
  }
  if (verify === 'UNVERIFIED' || verify === null) {
    return (
      <Badge status="processing" text="Chưa xác thực" className="ml-10"></Badge>
    );
  }
  if (verify === 'REJECTED' || verify === null) {
    return <Badge status="error" text="Đã bị huỷ" className="ml-10"></Badge>;
  }
};
