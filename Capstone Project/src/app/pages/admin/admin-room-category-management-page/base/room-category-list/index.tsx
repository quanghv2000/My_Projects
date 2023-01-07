import { Table, Button, Modal, message } from 'antd';
import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'types/RootState';
import 'app/pages/landlord/landlord-house-page/base/house-data-table/style.scss';
import {
  getDataRoomCategoriesRequest,
  deleteDataRoomCategoriesRequest,
} from 'app/pages/admin/admin-room-category-management-page/screen/action';
import RoomCategoryView from 'app/pages/admin/admin-room-category-management-page/base/room-category-view/index';
import RoomCategoryCreate from 'app/pages/admin/admin-room-category-management-page/base/room-category-create/index';
import Moment from 'react-moment';

const columnsRoomCategoris = [
  {
    title: 'STT',
    dataIndex: 'index',
    key: 'index',
    render: (text, record, index) => <b>{index + 1}</b>,
  },
  {
    title: 'Tên danh mục phòng',
    dataIndex: 'name',
    key: 'name',
    render: (text) => <span>{text}</span>,
  },
  {
    title: 'Mô tả',
    dataIndex: 'description',
    key: 'description',
    render: (description) =>
      description?.length > 50
        ? description?.substr(0, 50) + '...'
        : description,
  },
  {
    title: 'Ngày tạo',
    dataIndex: 'createdDate',
    key: 'createdDate',
    render: (text) => (
      <Moment format="DD/MM/YYYY HH:mm">{new Date(text)}</Moment>
    ),
  },
  {
    title: 'Người tạo',
    dataIndex: 'createdBy',
    key: 'createdBy',
    render: (text) => <span>{text}</span>,
  },
];

const { confirm } = Modal;

export const RoomCategoryList: React.FC<any> = () => {
  const dispatch = useDispatch();
  const [isModalViewVisible, setIsModalViewVisible] = useState(false);
  const [isModalCreateVisible, setIsModalCreateVisible] = useState(false);
  const [dataModalRoomCategoryView, setDataRoomCategoryView] = useState({});

  // state for select each row in table
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [selectedRow, setSelectedRow]: any = useState();

  const success = () => {
    message.success({
      content: 'Xoá thành công',
      className: 'custom-class',
    });
  };

  // function change item when select
  const onSelectChange = (selectedRowKeys: any, selectedRows: any) => {
    setSelectedRow(selectedRows);
    setSelectedRowKeys(selectedRowKeys);
  };

  // function row selection in table
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const hasSelected = selectedRowKeys.length > 0;

  const showConfirmDelete = () => {
    confirm({
      title: `Bạn có chắc chắn muốn xóa ${selectedRowKeys.length} danh mục phòng trọ?`,
      okText: 'Xác nhận',
      cancelText: 'Huỷ',
      onOk() {
        let list: any = [];
        selectedRow.forEach((item) => {
          list.push(item.id);
        });
        dispatch(deleteDataRoomCategoriesRequest({ list }));
      },
      onCancel() {},
    });
  };

  const state = useSelector(
    (state: RootState) => state?.adminRoomCategoryPageReducer
  );

  const roomCategories =
    state?.dataResponse?.length > 0 ? state?.dataResponse : [];

  useEffect(() => {
    dispatch(getDataRoomCategoriesRequest(''));
  }, []);

  useEffect(() => {
    if (state && state?.statusDelete === 'delete' && state?.loading) {
      setSelectedRow();
      setSelectedRowKeys([]);
      dispatch(getDataRoomCategoriesRequest(''));
      success();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state?.statusDelete]);

  return (
    <Fragment>
      <RoomCategoryView
        isModalViewVisible={isModalViewVisible}
        data={dataModalRoomCategoryView}
        setIsModalViewVisible={(visibale) => setIsModalViewVisible(visibale)}
      />
      <RoomCategoryCreate
        isModalCreateVisible={isModalCreateVisible}
        setIsModalCreateVisible={(visibale) =>
          setIsModalCreateVisible(visibale)
        }
      />
      <h3
        style={{
          textTransform: 'uppercase',
          fontWeight: 'bold',
          color: '#1CA4DA',
          marginBottom: 20,
        }}
      >
        Quản Lý Danh Mục Phòng Trọ
      </h3>
      <div
        className="mb-20"
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <div>
          <strong>Tổng số danh mục phòng trọ: {roomCategories?.length}</strong>
        </div>
        <div>
          <Button
            className="ml-20"
            style={{
              backgroundColor: '#87d068',
              borderColor: '#87d068',
              color: 'white',
              width: '210px',
            }}
            onClick={() => {
              setIsModalCreateVisible(true);
            }}
          >
            <i className="fa-solid fa-plus mr-5"></i>{' '}
            <strong>Thêm danh mục phòng</strong>
          </Button>
        </div>
      </div>
      <div style={{ marginBottom: 16 }}>
        {hasSelected ? (
          <div>
            <Button
              onClick={() => showConfirmDelete()}
              style={{
                backgroundColor: '#ff4d4f',
                color: 'white',
                borderColor: '#ff4d4f',
                boxShadow: '0 2px 0 rgb(0 0 0 / 5%)',
              }}
            >
              <i className="fa-solid fa-trash mr-5"></i> Xoá{' '}
              {selectedRowKeys.length}
            </Button>
          </div>
        ) : (
          ''
        )}
      </div>
      <Table
        rowKey="id"
        bordered
        className="mt-10 mb-10 table-cursor-pointer-row"
        columns={columnsRoomCategoris}
        loading={state?.loading}
        dataSource={roomCategories}
        pagination={{
          defaultPageSize: 10,
          showSizeChanger: false,
        }}
        scroll={{ x: 600 }}
        rowSelection={rowSelection}
        onRow={(record, rowIndex) => {
          return {
            onClick: (event) => {
              setIsModalViewVisible(true);
              setDataRoomCategoryView(record);
            }, // click row
          };
        }}
      />
    </Fragment>
  );
};
