import {
  Form,
  Button,
  Row,
  Col,
  Input,
  Radio,
  Select,
  DatePicker,
  Space,
  Upload,
  InputNumber,
  Tag,
  Table,
} from 'antd';
import React, { Fragment, useState } from 'react';
import { useHistory } from 'react-router-dom';
import type { RadioChangeEvent, DatePickerProps } from 'antd';
import { useSelector } from 'react-redux';
import { convertPrice } from 'helper/convert-price-to-vnd';
import { RootState } from 'types/RootState';
import { vietnameseStringToUnicode } from 'helper/search-vietnamese-words';
import { PlusOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const { Option } = Select;
const { TextArea } = Input;

export const RoomDetailServiceTab: React.FC<any> = () => {
  const history = useHistory();

  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  // check has row selected
  const hasSelected = selectedRowKeys.length > 0;

  // function change item when select
  const onSelectChange = (selectedRowKeys: any, selectedRows: any) => {
    setSelectedRowKeys(selectedRowKeys);
  };

  // function row selection in table
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const columns: any = [
    {
      title: 'Dịch vụ sử dụng',
      dataIndex: 'title',
      key: 'title',
      render: (text) => <b>{text}</b>,
    },
    {
      title: 'Đơn giá (VNĐ)',
      dataIndex: 'categories',
      key: 'categories',
    },
    {
      title: 'Số lượng',
      dataIndex: 'categories',
      key: 'categories',
    },
    {
      title: 'Trạng thái',
      dataIndex: 'quantity',
      key: 'quantity',
      render: (price) => <Tag color="volcano">Không sử dụng</Tag>,
    },
  ];
  return (
    <Fragment>
      <div
        style={{
          // display: 'flex',
          // justifyContent: 'center',
          width: ' 100%',
        }}
      >
        <Table
          rowKey="_id"
          bordered
          className="mt-10 mb-10"
          columns={columns}
          rowSelection={rowSelection}
          // loading={data?.loading}
          // dataSource={data?.dataResponse?.length > 0 ? data?.dataResponse : []}
          dataSource={[]}
        />
      </div>
    </Fragment>
  );
};
