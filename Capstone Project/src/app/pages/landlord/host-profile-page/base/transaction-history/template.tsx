import { Tag } from 'antd';
import { convertPrice } from 'helper/convert-price-to-vnd';

export const checkStatus = (record, status) => {
  if (status === 'SUCCESS') {
    return <Tag color="green">Thành công</Tag>;
  }
  if (status === 'FAILED') {
    return <Tag color="red">Thất bại</Tag>;
  }
  if (status === 'PENDING') {
    return <Tag color="gold">Chờ xác nhận</Tag>;
  }

  // if (
  //   record.typeOfTransaction === 'DEPOSIT' &&
  //   status === 'SUCCESS' &&
  //   record?.action === 'MINUS'
  // ) {
  //   return <Tag color="green">Trừ tiền thành công</Tag>;
  // }

  // // Posting
  // if (record.typeOfTransaction === 'POSTING') {
  //   if (status === 'SUCCESS') {
  //     return <Tag color="green">Đăng tin thành công</Tag>;
  //   }
  //   if (status === 'FAILED') {
  //     return <Tag color="red">Tin không hợp lệ</Tag>;
  //   }
  //   if (status === 'PENDING') {
  //     return <Tag color="gold">Chờ kiểm duyệt</Tag>;
  //   }
  // }

  // // Extend
  // if (record.typeOfTransaction === 'POSTING_EXTEND') {
  //   if (status === 'SUCCESS') {
  //     return <Tag color="green">Gia hạn thành công</Tag>;
  //   }
  //   if (status === 'FAILED') {
  //     return <Tag color="red">Gia hạn thất bại</Tag>;
  //   }
  //   if (status === 'PENDING') {
  //     return <Tag color="gold">Chờ kiểm duyệt</Tag>;
  //   }
  // }

  // // Get Notification
  // if (record.typeOfTransaction === 'GET_NOTIFICATIONS') {
  //   if (status === 'SUCCESS') {
  //     return <Tag color="green">Đăng ký thành công</Tag>;
  //   }
  //   if (status === 'FAILED') {
  //     return <Tag color="red">Đăng ký thất bại</Tag>;
  //   }
  //   if (status === 'PENDING') {
  //     return <Tag color="gold">Chờ xác nhận</Tag>;
  //   }
  // }

  // // Refund
  // if (record.typeOfTransaction === 'REFUND') {
  //   if (status === 'SUCCESS') {
  //     return <Tag color="green">Hoàn tiền thành công</Tag>;
  //   }
  // }
};

export const checkTypeOfTransaction = (transferType: any, action: any) => {
  if (transferType === 'DEPOSIT' && action === 'PLUS') {
    return <span>Nạp tiền</span>;
  }
  if (transferType === 'DEPOSIT' && action === 'MINUS') {
    return <span>Trừ tiền</span>;
  }
  if (transferType === 'DEPOSIT' && action === 'DO_NOTHING') {
    return <span>Nạp tiền</span>;
  }
  if (transferType === 'POSTING') {
    return <span>Đăng tin</span>;
  }
  if (transferType === 'POSTING_EXTEND') {
    return <span>Gia hạn bài đăng</span>;
  }
  if (transferType === 'GET_NOTIFICATIONS') {
    return <span>Đăng ký dịch vụ</span>;
  }
  if (transferType === 'REFUND') {
    return <span>Hoàn tiền</span>;
  }
  if (transferType === 'VERIFY') {
    return <span>Xác thực đăng tin</span>;
  }
};

export const checkPriceStatus = (record: any, amount: any) => {
  if (record.action === 'PLUS') {
    return (
      <Tag color="green" style={{ fontWeight: 'bold' }}>{`+ ${convertPrice(
        amount
      )} vn₫`}</Tag>
    );
  }
  if (record.action === 'MINUS') {
    return (
      <Tag color="red" style={{ fontWeight: 'bold' }}>{`- ${convertPrice(
        amount
      )} vn₫`}</Tag>
    );
  }

  if (record.action === 'WAITING' && record.transactionType !== 'DEPOSIT') {
    return (
      <Tag color="red" style={{ fontWeight: 'bold' }}>{`- ${convertPrice(
        amount
      )} vn₫`}</Tag>
    );
  }

  if (record.action === 'WAITING' && record.transactionType === 'DEPOSIT') {
    return (
      <Tag color="gold" style={{ fontWeight: 'bold' }}>{`${convertPrice(
        amount
      )} vn₫`}</Tag>
    );
  }

  if (record.action === 'DO_NOTHING') {
    return (
      <Tag style={{ fontWeight: 'bold' }}>{`${convertPrice(amount)} vn₫`}</Tag>
    );
  }
};
