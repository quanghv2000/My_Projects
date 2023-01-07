import { LoadScript } from '@react-google-maps/api';
import { Button, message, Modal, Table } from 'antd';
import MapPositionCreate from 'app/pages/admin/admin-map-position/base/map-position-create';
import MapPosition from 'app/pages/admin/admin-map-position/base/map-position-view';
import {
  deleteMapPositonRequest,
  getMapPositonRequest,
  clearStateMapPositon
} from 'app/pages/admin/admin-map-position/screen/action';
import 'app/pages/landlord/landlord-house-page/base/house-data-table/style.scss';
import React, { Fragment, useEffect, useState } from 'react';
import Moment from 'react-moment';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'types/RootState';
import { DEFAULT_GOOGLE_MAP_API_KEY } from 'utils/config';

const columnsPostingCost: any = [
  {
    title: 'STT',
    dataIndex: 'index',
    key: 'index',
    render: (text, record, index) => <b>{index + 1}</b>,
  },
  {
    title: 'Địa điểm',
    dataIndex: 'name',
    key: 'name',
    render: (name) => <span>{name}</span>,
  },
  {
    title: 'Latitude (Vĩ độ)',
    dataIndex: 'latitude',
    key: 'latitude',
    render: (latitude) => <span>{latitude}</span>,
  },
  {
    title: 'Longitude (Kinh độ)',
    dataIndex: 'longitude',
    key: 'longitude',
    render: (longitude) => <span>{longitude}</span>,
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

export const MapPositionList: React.FC<any> = () => {
  const dispatch = useDispatch();
  const [isModalViewVisible, setIsModalViewVisible] = useState(false);
  const [isModalCreateVisible, setIsModalCreateVisible] = useState(false);
  const [dataModalPostingCostView, setDataPostingCostView] = useState({});

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

  const hasSelected = selectedRowKeys.length > 0;

  const showConfirmDelete = () => {
    confirm({
      title: `Bạn có chắc chắn muốn xóa ${selectedRowKeys.length} địa điểm này?`,
      okText: 'Xác nhận',
      cancelText: 'Huỷ',
      onOk() {
        let list: any = [];
        selectedRow.forEach((item) => {
          list.push(item.id);
        });
        dispatch(deleteMapPositonRequest({ list }));
      },
      onCancel() {},
    });
  };

  const state = useSelector(
    (state: RootState) => state?.adminMapPositonPageReducer
  );


  useEffect(() => {
    if (state?.status === 'deleted') {
      setSelectedRow();
      setSelectedRowKeys([]);
      dispatch(clearStateMapPositon(''));
      dispatch(getMapPositonRequest(''));
      success();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state?.status]);

  const success = () => {
    message.success({
      content: 'Xoá thành công!',
      className: 'custom-class',
    });
  };

  const dataMapLength =
    state?.dataResponse?.length > 0 ? state?.dataResponse : [];

  useEffect(() => {
    dispatch(getMapPositonRequest(''));
  }, []);

  return (
    <Fragment>
      <LoadScript
        googleMapsApiKey={DEFAULT_GOOGLE_MAP_API_KEY}
        libraries={['places']}
        key="map-create"
      >
        <MapPosition
          isModalViewVisible={isModalViewVisible}
          data={dataModalPostingCostView}
          setIsModalViewVisible={(visibale) => setIsModalViewVisible(visibale)}
        />
        <MapPositionCreate
          isModalCreateVisible={isModalCreateVisible}
          setIsModalCreateVisible={(visibale) =>
            setIsModalCreateVisible(visibale)
          }
        />
      </LoadScript>
      <h3
        style={{
          textTransform: 'uppercase',
          fontWeight: 'bold',
          color: '#1CA4DA',
          marginBottom: 20,
        }}
      >
        Quản Lý địa điểm bản đồ
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
          <strong>Tổng số địa điểm trên bản đồ: {dataMapLength?.length}</strong>
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
            <strong>Thêm địa điểm</strong>
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
        columns={columnsPostingCost}
        // loading={state?.loading}
        loading={false}
        dataSource={state?.dataResponse?.length > 0 ? state?.dataResponse : []}
        // dataSource={PostingCosts}
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
              setDataPostingCostView(record);
            }, // click row
          };
        }}
      />
    </Fragment>
  );
};
