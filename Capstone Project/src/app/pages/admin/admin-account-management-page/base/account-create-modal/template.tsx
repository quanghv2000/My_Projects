import { Select } from 'antd';

const { Option } = Select;

export const roleData = [
  {
    id: 1,
    name: 'Admin',
    role: 'ROLE_ADMIN',
  },
  {
    id: 2,
    name: 'Người dùng',
    role: 'ROLE_USER',
  },
  {
    id: 3,
    name: 'Chủ nhà',
    role: 'ROLE_LANDLORD',
  },
];

/**
 * @function renderOptionSelect
 * @param {Array} data the array data
 *
 * @description get array from parameter and return new options
 * @return {Array} new array .
 */

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
