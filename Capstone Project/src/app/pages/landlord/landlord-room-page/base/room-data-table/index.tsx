import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Button, Form, Input, message, Modal, Table, Tag } from 'antd';
import 'app/pages/landlord/landlord-room-page/base/room-data-table/style.scss';
import {
  clearStateHostRoom,
  deleteHostRoomRequest,
  hostRoomGetRequest,
} from 'app/pages/landlord/landlord-room-page/screen/action';
import { convertPrice } from 'helper/convert-price-to-vnd';
import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { RootState } from 'types/RootState';

const columns: any = [
  {
    title: 'Tên phòng',
    dataIndex: 'name',
    fixed: 'left',
    key: 'name',
    render: (name, value) => <Link to={`/host/room/${value?.id}`}>{name}</Link>,
  },
  {
    title: 'Diện tích',
    align: 'center',
    dataIndex: 'area',
    key: 'area',
    render: (value) => {
      return value + ' m²';
    },
  },
  {
    title: 'Danh mục phòng',
    dataIndex: 'roomCategory',
    key: 'roomCategory',
    align: 'center',
    render: (value) => {
      return value?.name;
    },
  },
  {
    title: 'Loại phòng',
    dataIndex: 'roomType',
    key: 'roomType',
    align: 'center',
    render: (value) => {
      return value?.name;
    },
  },
  {
    title: 'Phòng đại diện',
    dataIndex: 'check',
    key: 'check',
    align: 'center',
    render: (check) => {
      if (check) {
        return (
          <Tag color="green">
            <i className="fa-solid fa-check"></i>
          </Tag>
        );
      } else return '';
    },
  },
  {
    title: 'Số lượng người tối đa',
    align: 'center',
    dataIndex: 'maximumNumberOfPeople',
    key: 'maximumNumberOfPeople',
    render: (value) => {
      return `${value} người`;
    },
  },
  {
    title: 'Đơn giá',
    dataIndex: 'rentalPrice',
    align: 'center',
    key: 'rentalPrice',
    render: (value) => {
      return `₫${convertPrice(value)}`;
    },
  },
  {
    title: 'Trạng thái phòng',
    dataIndex: 'status',
    align: 'center',
    key: 'status',
    render: (status) => {
      if (status === true) {
        return <Tag color="green">Còn phòng</Tag>;
      } else {
        return <Tag color="red">Hết phòng</Tag>;
      }
    },
  },
];

export const RoomDataTable: React.FC<any> = (props: any) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [dataSource, setDataSource]: any = useState([]);
  const [form] = Form.useForm();

  // function change item when select
  const onSelectChange = (selectedRowKeys: any, selectedRows: any) => {
    setSelectedRowKeys(selectedRowKeys);
  };

  // function row selection in table
  const rowSelection = {
    selectedRowKeys,
    getCheckboxProps: (record: any) => {
      return {
        disabled: record.check,
      };
    },
    onChange: onSelectChange,
  };

  const deleteRoom = () => {
    dispatch(
      deleteHostRoomRequest({
        list: selectedRowKeys,
      })
    );
  };

  const confirm = () => {
    Modal.confirm({
      title: 'Xác nhận xoá phòng',
      icon: <ExclamationCircleOutlined />,
      content: `Bạn có chắc chắn muốn xoá ${selectedRowKeys?.length} căn phòng này `,
      okText: 'Xác nhận',
      cancelText: 'Huỷ',
      onOk: deleteRoom,
    });
  };

  const state = useSelector((state: RootState) => state?.hostRoomListReducer);

  useEffect(() => {
    if (state?.msg === 'deleted') {
      message.success('Đã xoá phòng thành công');
      dispatch(clearStateHostRoom(''));
      setSelectedRowKeys([]);
      dispatch(
        hostRoomGetRequest({
          pageSize: 10,
          pageIndex: 1,
          id: props?.id,
          name: '',
        })
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state?.msg]);

  useEffect(() => {
    setSelectedRowKeys([]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onChangepage = (value) => {
    dispatch(
      hostRoomGetRequest({
        pageSize: 10,
        pageIndex: value,
        id: props?.id,
        name: form.getFieldValue('name') ? form.getFieldValue('name') : '',
      })
    );
  };

  useEffect(() => {
    if (state?.dataResponse?.results?.length >= 0) {
      setTotalPages(state?.dataResponse?.totalItems);
      setDataSource(state?.dataResponse?.results);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  const handleSave = (row: any) => {
    const newData = [...dataSource];
    const index = newData.findIndex((item) => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row,
    });
    setDataSource(newData);
  };

  const defaultColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: any) => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        handleSave,
      }),
    };
  });

  const onFinish = (values: any) => {
    const body = {
      pageSize: 10,
      pageIndex: 1,
      id: props?.id,
      name: values?.name,
    };

    dispatch(hostRoomGetRequest(body));
  };

  return (
    <Fragment>
      <div
        className="mb-20 mt-10"
        style={{ display: 'flex', justifyContent: 'space-between' }}
      >
        <div>
          <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            onFinish={onFinish}
            autoComplete="off"
            form={form}
            style={{ display: ' flex' }}
          >
            <Form.Item name="name">
              <Input style={{ width: 300 }} placeholder="Tên phòng" />
            </Form.Item>

            <Form.Item>
              <Button htmlType="submit" className="ml-20" type="primary">
                Tìm kiếm
              </Button>
            </Form.Item>
          </Form>
        </div>
        <div>
          {/* <Button
            className="ml-20"
            style={{
              backgroundColor: '#fa8c16',
              borderColor: '#fa8c16',
              color: 'white',
            }}
          >
            <i className="fa-solid fa-users mr-5"></i> Khách thuê
          </Button> */}
          {/* <Button
            className="ml-20"
            style={{
              backgroundColor: '#13c2c2',
              borderColor: '#13c2c2',
              color: 'white',
            }}
          >
            <i className="fa-solid fa-building mr-5"></i> Thêm tầng
          </Button> */}
          <Button
            className="ml-20"
            style={{
              backgroundColor: '#389e0d',
              borderColor: '#389e0d',
              color: 'white',
            }}
            onClick={() => history.push('/host/room/create')}
          >
            <i className="fa-solid fa-house mr-5"></i> Thêm phòng
          </Button>
        </div>
      </div>
      {selectedRowKeys.length > 0 ? (
        <div
          style={{
            marginBottom: 16,
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <Button
            style={{
              backgroundColor: '#ff4d4f',
              color: 'white',
              borderColor: '#ff4d4f',
              boxShadow: '0 2px 0 rgb(0 0 0 / 5%)',
            }}
            onClick={confirm}
          >
            <i className="fa-solid fa-delete-left mr-5"></i> Xoá{' '}
            {selectedRowKeys.length} phòng
          </Button>
        </div>
      ) : (
        ''
      )}

      <Table
        rowKey="id"
        bordered
        rowSelection={rowSelection}
        className="mt-10 mb-10"
        columns={defaultColumns}
        pagination={{
          defaultPageSize: 10,
          showSizeChanger: false,
          total: state?.dataResponse?.totalItems
            ? state?.dataResponse?.totalItems
            : totalPages,
          current: state?.dataResponse?.currentPage,
          onChange: onChangepage,
        }}
        loading={state?.loading}
        dataSource={dataSource?.length > 0 ? dataSource : []}
      />
      <div className="mt-50 flex justify-between">
        <p style={{ color: '#ff4d4f' }} className="mt-10">
          (*): Xoá phòng đại diện - Bạn cần xoá bài đăng hoặc căn nhà chứa căn
          phòng này!
        </p>
      </div>
    </Fragment>
  );
};
