import { Table, Input, Button, Form, Modal, PageHeader, message } from 'antd';
import React, { Fragment, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'types/RootState';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router-dom';
import { vietnameseStringToUnicode } from 'helper/search-vietnamese-words';
import 'app/pages/landlord/landlord-house-page/base/house-data-table/style.scss';
import {
  hostHouseGetRequest,
  deleteHostHouseRequest,
  clearStateHostHouse,
} from 'app/pages/landlord/landlord-house-page/screen/action';
import { Link } from 'react-router-dom';

const columns: any = [
  {
    title: 'Tên nhà',
    dataIndex: 'name',
    fixed: 'left',
    key: 'name',
    align: 'center',
    render: (name, value) => (
      <Link to={`/host/house/${value?.id}`}>{name}</Link>
    ),
    // width: 150,
  },
  {
    title: 'Hướng nhà',
    align: 'center',
    dataIndex: 'houseDirection',
    key: 'houseDirection',
    // width: 150,
  },
  {
    title: 'Loại hình cho thuê',
    align: 'center',
    dataIndex: 'typeOfRental',
    render: (text) => <span>{text?.name}</span>,
  },
  {
    title: 'Diện tích',
    dataIndex: 'area',
    key: 'area',
    align: 'center',
    render: (text) => <span>{text}m²</span>,
  },
  {
    title: 'Số điện thoại',
    align: 'center',
    dataIndex: 'phoneNumber',
    key: 'phoneNumber',
  },
  {
    title: 'Tổng số phòng',
    dataIndex: 'roomDetails',
    key: 'roomDetails',
    align: 'center',
    render: (name, value) => {
      return value?.roomDetails?.roomCount + ' Phòng';
    },
  },
  {
    title: 'Địa chỉ',
    dataIndex: 'address',
    key: 'address',
    render: (value) => <span>{value?.street}</span>,
  },
];

export const HouseDataTable: React.FC<any> = () => {
  // history react dom to change link
  const history = useHistory();
  const [dataSource, setDataSource] = useState([]);
  const [keyword, setKeyword] = useState('');
  const [loading, setLoading] = useState(false);
  // state for setting open and close modal user
  const dispatch = useDispatch();
  // state for select each row in table
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const state = useSelector((state: RootState) => state?.houseListPageReducer);

  const userInfoCookies = localStorage.getItem('user-info');
  // const userInfoCookies = getCookie('user-info');
  let userInfo: any;

  if (userInfoCookies) {
    userInfo = JSON.parse(userInfoCookies);
  }

  // check has row selected
  const hasSelected = selectedRowKeys.length > 0;

  // function change item when select
  const onSelectChange = (selectedRowKeys: any, selectedRows: any) => {
    setSelectedRowKeys(selectedRowKeys);
  };

  // function row selection in table
  const rowSelection: any = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  useEffect(() => {
    if (state?.dataResponse?.length) {
      setDataSource(state?.dataResponse);
    }
  }, [state?.dataResponse, state?.msg]);

  const deleteRoom = () => {
    dispatch(
      deleteHostHouseRequest({
        list: selectedRowKeys,
      })
    );
  };

  const confirm = () => {
    Modal.confirm({
      title: 'Xác nhận xoá nhà',
      icon: <ExclamationCircleOutlined />,
      content: (
        <div>
          <span
            style={{ fontWeight: 'bold' }}
          >{`Bạn có chắc chắn muốn xoá ${selectedRowKeys?.length} căn nhà này `}</span>
          <div style={{ color: 'gray', fontSize: 13 }}>
            (Những bài đăng tin về căn nhà này cũng sẽ không được hiện thị nữa)
          </div>
        </div>
      ),
      okText: 'Xác nhận',
      cancelText: 'Huỷ',
      onOk: deleteRoom,
    });
  };

  useEffect(() => {
    if (state?.msg === 'deleted') {
      message.success('Đã xoá nhà thành công');
      setSelectedRowKeys([]);
      setDataSource([]);
      dispatch(clearStateHostHouse(''));
      dispatch(hostHouseGetRequest(userInfo?.id));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state?.msg]);

  useEffect(() => {
    setSelectedRowKeys([]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onFinish = (values: any) => {};

  const onFinishFailed = (errorInfo: any) => {};

  return (
    <Fragment>
      <PageHeader
        className="site-page-header mb-20"
        onBack={() => history.push('/host/dashboard')}
        title="Nhà"
        subTitle="Quản lý khu nhà"
        extra={[
          // <Button
          //   className="ml-20"
          //   style={{
          //     backgroundColor: '#fa8c16',
          //     borderColor: '#fa8c16',
          //     color: 'white',
          //   }}
          //   onClick={showModal}
          // >
          //   <i className="fa-solid fa-users mr-5"></i> Khách thuê
          // </Button>,
          <Button
            className="ml-20"
            style={{
              backgroundColor: '#13c2c2',
              borderColor: '#13c2c2',
              color: 'white',
            }}
            onClick={() => history.push('/host/house/create')}
          >
            <i className="fa-solid fa-house mr-5"></i> Thêm nhà
          </Button>,
        ]}
      />
      <div
        className="mt-10"
        style={{ display: 'flex', justifyContent: 'space-between' }}
      >
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          style={{ display: ' flex' }}
        >
          <Form.Item name="name">
            <Input
              style={{ width: 300 }}
              placeholder="Tên nhà"
              onChange={(e: any) => {
                setKeyword(
                  vietnameseStringToUnicode(e?.target?.value).toLowerCase()
                );
              }}
              allowClear
              onKeyDown={(e: any) => {
                if (e.key === 'Enter') {
                  const trimmedSearchValue = vietnameseStringToUnicode(
                    e?.target?.value
                  ).toLowerCase();
                  if (trimmedSearchValue === '') {
                    setLoading(true);
                    setTimeout(() => {
                      setLoading(false);
                      setDataSource(state?.dataResponse);
                    }, 200);
                  } else {
                    setLoading(true);
                    setTimeout(() => {
                      const newArray = state?.dataResponse?.filter(
                        (item: any) => {
                          const itemConvert = vietnameseStringToUnicode(
                            item?.name.toLowerCase()
                          );
                          return itemConvert.indexOf(trimmedSearchValue) > -1;
                        }
                      );
                      setLoading(false);
                      setDataSource(newArray);
                    }, 200);
                  }
                }
              }}
            />
          </Form.Item>

          <Form.Item>
            <Button
              htmlType="submit"
              className="ml-20"
              type="primary"
              onClick={() => {
                if (keyword === '') {
                  setLoading(true);
                  setTimeout(() => {
                    setLoading(false);
                    setDataSource(state?.dataResponse);
                  }, 200);
                } else {
                  setLoading(true);
                  setTimeout(() => {
                    const newArray = state?.dataResponse?.filter(
                      (item: any) => {
                        const itemConvert = vietnameseStringToUnicode(
                          item?.name.toLowerCase()
                        );
                        return itemConvert.indexOf(keyword) > -1;
                      }
                    );
                    setLoading(false);
                    setDataSource(newArray);
                  }, 200);
                }
              }}
            >
              Tìm kiếm
            </Button>
          </Form.Item>
        </Form>
      </div>

      <div className="mb-20">
        <div>
          <b>Số nhà đang có</b> : {state?.dataResponse?.length}{' '}
        </div>
      </div>
      <div style={{ marginBottom: 16 }}>
        {hasSelected ? (
          <div>
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
              {selectedRowKeys.length} nhà
            </Button>
          </div>
        ) : (
          ''
        )}
      </div>
      <Table
        rowKey="id"
        bordered
        pagination={{
          defaultPageSize: 10,
          showSizeChanger: false,
        }}
        scroll={{ x: 600 }}
        rowSelection={rowSelection}
        // rowSelection={rowSelection}
        className="mt-10 mb-10"
        columns={columns}
        loading={state?.loading || loading}
        dataSource={dataSource?.length > 0 ? dataSource : []}
      />
      {/* <Modal
        title="Khách thuê"
        visible={isModalVisible}
        okText="Chọn"
        cancelText="Đóng"
        onCancel={handleCancel}
        onOk={handleOk}
        okButtonProps={{ disabled: true }}
        width={1200}
        style={{ top: 20 }}
      >
        <CustomerDataTable />
      </Modal> */}

      {/* <Modal
        title="Đăng tin"
        visible={isModalPostVisible}
        okText="Đăng tin"
        cancelText="Đóng"
        onCancel={() => setIsModalPostVisible(false)}
        // okButtonProps={{ disabled: true }}
        footer={null}
        width={800}
        style={{ top: 20 }}
      >
        <HousePost page="house-list" />
      </Modal> */}
    </Fragment>
  );
};
