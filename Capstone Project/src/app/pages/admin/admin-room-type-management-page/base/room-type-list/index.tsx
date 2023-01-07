import { Table, Button, Modal, message } from 'antd';
import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'types/RootState';
import 'app/pages/landlord/landlord-house-page/base/house-data-table/style.scss';
import {
  getDataRoomTypeRequest,
  deleteDataRoomTypeRequest,
} from 'app/pages/admin/admin-room-type-management-page/screen/action';
import RoomTypeView from 'app/pages/admin/admin-room-type-management-page/base/room-type-view/index';
import RoomTypeCreate from 'app/pages/admin/admin-room-type-management-page/base/room-type-create/index';
import Moment from 'react-moment';

const columnsRoomType = [
  {
    title: 'STT',
    dataIndex: 'index',
    key: 'index',
    render: (text, record, index) => <b>{index + 1}</b>,
  },
  {
    title: 'Tên loại phòng',
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

export const RoomTypeList: React.FC<any> = () => {
  const dispatch = useDispatch();
  const [isModalViewVisible, setIsModalViewVisible] = useState(false);
  const [isModalCreateVisible, setIsModalCreateVisible] = useState(false);
  const [dataModalRoomTypeView, setDataRoomTypeView] = useState({});

  // state for select each row in table
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [selectedRow, setSelectedRow]: any = useState();

  const success = () => {
    message.success({
      content: 'Xoá thành công',
      className: 'custom-class',
    });
  };

  const state = useSelector(
    (state: RootState) => state?.adminRoomTypePageReducer
  );

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

  useEffect(() => {
    if (state && state?.statusDelete === 'delete' && state?.loading) {
      setSelectedRow();
      setSelectedRowKeys([]);
      dispatch(getDataRoomTypeRequest(''));
      success();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state?.statusDelete]);

  const hasSelected = selectedRowKeys.length > 0;

  const showConfirmDelete = () => {
    confirm({
      title: `Bạn có chắc chắn muốn xóa ${selectedRowKeys.length} loại phòng?`,
      okText: 'Xác nhận',
      cancelText: 'Huỷ',
      onOk() {
        let list: any = [];
        selectedRow.forEach((item) => {
          list.push(item.id);
        });
        dispatch(deleteDataRoomTypeRequest({ list }));
      },
      onCancel() {},
    });
  };

  const roomTypes = state?.dataResponse?.length > 0 ? state?.dataResponse : [];

  useEffect(() => {
    dispatch(getDataRoomTypeRequest(''));
  }, []);

  return (
    <Fragment>
      <RoomTypeView
        isModalViewVisible={isModalViewVisible}
        data={dataModalRoomTypeView}
        setIsModalViewVisible={(visibale) => setIsModalViewVisible(visibale)}
      />
      <RoomTypeCreate
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
        Quản Lý Các Loại Phòng
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
          <strong>Tổng số loại phòng: {roomTypes?.length}</strong>
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
            <strong>Thêm loại phòng</strong>
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
        columns={columnsRoomType}
        loading={state?.loading}
        dataSource={roomTypes}
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
              setDataRoomTypeView(record);
            }, // click row
          };
        }}
      />
    </Fragment>
  );
};
