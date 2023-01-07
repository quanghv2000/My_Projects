import { Select } from 'antd';
import { getRenderPropValue } from 'antd/lib/_util/getRenderPropValue';

const { Option } = Select;

export const actionData = [
  {
    id: 1,
    name: 'Nạp tiền',
    type: 'PLUS',
    transferType: 'DEPOSIT',
    color: 'green',
  },
  {
    id: 2,
    name: 'Trừ tiền',
    type: 'MINUS',
    transferType: 'DEDUCTION',
    color: 'red',
  },
];

export const renderOptionSelectUserName = (data: any) => {
  // check if length of array bigger than 0 to continue handle
  if (data?.length > 0) {
    // for to get item to pass option to new array
    const options = data?.map((item: any, key: any) => {
      return (
        <Option key={key} value={item?.id}>
          {item?.username}
        </Option>
      );
    });
    return options;
  } else return [];
};

export const renderOptionSelect = (data: any) => {
  // check if length of array bigger than 0 to continue handle
  if (data?.length > 0) {
    // for to get item to pass option to new array
    const options = data?.map((item: any, key: any) => {
      return (
        <Option key={key} value={item?.id}>
          {item?.name}
        </Option>
      );
    });
    return options;
  } else return [];
};

export const findDataItem = (id: any, data: any) => {
  // check if length of array bigger than 0 to continue handle
  if (data?.length > 0 && id) {
    let itemData = {};
    data?.map((item: any) => {
      if (item?.id === id) {
        itemData = item;
      }
    });
    return itemData;
  } else return null;
};

export const checkTypeTransaction = (type) => {
  if (type) {
    let typeTransaction = '';
    actionData?.map((item: any) => {
      if (item?.id === type) {
        typeTransaction = item?.name;
      }
    });
    return typeTransaction;
  } else return 'Hoá đơn';
};

export const checkTypeTransactionColor = (type) => {
  if (type) {
    let colorTransaction = '';
    actionData?.map((item: any) => {
      if (item?.id === type) {
        colorTransaction = item?.color;
      }
    });
    return colorTransaction;
  } else return 'green';
};
