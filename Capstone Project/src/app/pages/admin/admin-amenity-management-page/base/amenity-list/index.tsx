import { Table, Button, Modal, message } from 'antd';
import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'types/RootState';
import 'app/pages/landlord/landlord-house-page/base/house-data-table/style.scss';
import {
  getDataAmenityRequest,
  deleteDataAmenityRequest,
  clearStateAmenity,
} from 'app/pages/admin/admin-amenity-management-page/screen/action';
import AmenityView from 'app/pages/admin/admin-amenity-management-page/base/amenity-view/index';
import AmenityCreate from 'app/pages/admin/admin-amenity-management-page/base/amenity-create/index';
import Moment from 'react-moment';

const columnsAmenities = [
  {
    title: 'STT',
    dataIndex: 'index',
    key: 'index',
    render: (text, record, index) => <b>{index + 1}</b>,
  },
  {
    title: 'Tên tiện nghi',
    dataIndex: 'name',
    key: 'name',
    render: (text) => <span>{text}</span>,
  },
  {
    title: 'Tiện nghi dành cho',
    dataIndex: 'type',
    key: 'type',
    render: (text) => <span>{text === 'room' ? 'Phòng' : 'Nhà'}</span>,
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

export const AmenityList: React.FC<any> = (props: any) => {
  const dispatch = useDispatch();
  const [isModalViewVisible, setIsModalViewVisible] = useState(false);
  const [isModalCreateVisible, setIsModalCreateVisible] = useState(false);
  const [dataModalAmenityView, setDataAmenityView] = useState({});
  const amenityKey = props.amenityKey;

  // state for select each row in table
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [selectedRow, setSelectedRow]: any = useState();

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

  const success = () => {
    message.success({
      content: 'Xoá thành công',
      className: 'custom-class',
    });
  };

  const state = useSelector(
    (state: RootState) => state?.adminAmenityPageReducer
  );

  useEffect(() => {
    if (
      state &&
      state?.statusDelete === 'delete' &&
      state?.loading &&
      selectedRowKeys.length > 0
    ) {
      setSelectedRow();
      setSelectedRowKeys([]);
      dispatch(clearStateAmenity(''));
      dispatch(getDataAmenityRequest(''));
      success();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state?.statusDelete]);

  const hasSelected = selectedRowKeys.length > 0;

  const showConfirmDelete = () => {
    confirm({
      title: `Bạn có chắc chắn muốn xóa ${selectedRowKeys.length} tiện nghi?`,
      okText: 'Xác nhận',
      cancelText: 'Huỷ',
      onOk() {
        let list: any = [];
        selectedRow.forEach((item) => {
          list.push(item.id);
        });
        dispatch(deleteDataAmenityRequest({ list }));
      },
      onCancel() {},
    });
  };

  let Amenity = state?.dataResponse?.length > 0 ? state?.dataResponse : [];
  Amenity = Amenity.filter((item) => {
    return item.type === amenityKey;
  });

  useEffect(() => {
    dispatch(getDataAmenityRequest(''));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Fragment>
      <AmenityView
        isModalViewVisible={isModalViewVisible}
        data={dataModalAmenityView}
        setIsModalViewVisible={(visibale) => setIsModalViewVisible(visibale)}
      />
      <AmenityCreate
        isModalCreateVisible={isModalCreateVisible}
        setIsModalCreateVisible={(visibale) =>
          setIsModalCreateVisible(visibale)
        }
      />
      <div
        className="mb-20"
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <div>
          <strong>
            Tổng số tiện nghi {amenityKey === 'house' ? 'nhà' : 'phòng'}:{' '}
            {Amenity?.length}
          </strong>
        </div>
        <div>
          <Button
            className="ml-20"
            style={{
              backgroundColor: '#87d068',
              borderColor: '#87d068',
              color: 'white',
              width: '165px',
            }}
            onClick={() => {
              setIsModalCreateVisible(true);
            }}
          >
            <i className="fa-solid fa-plus mr-5"></i>{' '}
            <strong>Thêm tiện nghi</strong>
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
        columns={columnsAmenities}
        loading={state?.loading}
        dataSource={Amenity}
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
              setDataAmenityView(record);
            }, // click row
          };
        }}
      />
    </Fragment>
  );
};
