import { Table, Button, Modal, message } from 'antd';
import React, { Fragment, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'types/RootState';
import 'app/pages/landlord/landlord-house-page/base/house-data-table/style.scss';
import Moment from 'react-moment';
import { useDispatch } from 'react-redux';
import {
  deleteDataTypeOfRentalRequest,
  getDataTypeOfRentalRequest,
} from 'app/pages/admin/admin-type-of-rental-management-page/screen/action';
import TypeOfRentalView from 'app/pages/admin/admin-type-of-rental-management-page/base/type-of-rental-view/index';
import TypeOfRentalCreate from 'app/pages/admin/admin-type-of-rental-management-page/base/type-of-rental-create/index';

const { confirm } = Modal;

export const TypeOfRentalList: React.FC<any> = () => {
  const dispatch = useDispatch();
  const [isModalViewVisible, setIsModalViewVisible] = useState(false);
  const [isModalCreateVisible, setIsModalCreateVisible] = useState(false);
  const [dataModalTypeOfRentalView, setDataModalTypeOfRentalView] = useState(
    {}
  );
  const success = () => {
    message.success({
      content: 'Xoá thành công',
      className: 'custom-class',
    });
  };

  const state = useSelector(
    (state: RootState) => state?.adminTypeOfRentalPageReducer
  );

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

  useEffect(() => {
    if (state && state?.statusDelete === 'delete' && state?.loading) {
      setSelectedRow();
      setSelectedRowKeys([]);
      dispatch(getDataTypeOfRentalRequest(''));
      success();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state?.statusDelete]);

  const showConfirmDelete = () => {
    confirm({
      title: `Bạn có chắc chắn muốn xóa ${selectedRowKeys.length} loại hình cho thuê?`,
      okText: 'Xác nhận',
      cancelText: 'Huỷ',
      onOk() {
        let list: any = [];
        selectedRow.forEach((item) => {
          list.push(item.id);
        });
        dispatch(deleteDataTypeOfRentalRequest({ list }));
      },
      onCancel() {},
    });
  };

  const typeOfRentals: any = [
    {
      title: 'STT',
      dataIndex: 'index',
      key: 'index',
      // align: 'center',
      // width: 100,
      render: (text, record, index) => <b>{index + 1}</b>,
    },
    {
      title: 'Loại hình cho thuê',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <span>{text}</span>,
    },
    // {
    //   title: 'Mô tả',
    //   dataIndex: 'description',
    //   key: 'description',
    //   ellipsis: {
    //     showTitle: false,
    //   },
    //   render: (description) => (
    //     <Tooltip placement="topLeft" title={description}>
    //       {description}
    //     </Tooltip>
    //   ),
    // },
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
      // align: 'center',
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

  return (
    <Fragment>
      <TypeOfRentalView
        isModalViewVisible={isModalViewVisible}
        data={dataModalTypeOfRentalView}
        setIsModalViewVisible={(visibale) => setIsModalViewVisible(visibale)}
      />
      <TypeOfRentalCreate
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
        Quản Lý Loại Hình Cho Thuê
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
          <strong>
            Tổng số loại hình cho thuê: {state?.dataResponse?.length}
          </strong>
        </div>
        <div>
          <Button
            className="ml-20"
            style={{
              backgroundColor: '#87d068',
              borderColor: '#87d068',
              color: 'white',
              width: '215px',
            }}
            onClick={() => {
              setIsModalCreateVisible(true);
            }}
          >
            <i className="fa-solid fa-plus mr-5"></i>{' '}
            <strong>Thêm loại hình cho thuê</strong>
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
        pagination={{
          defaultPageSize: 10,
          showSizeChanger: false,
        }}
        scroll={{ x: 600 }}
        rowSelection={rowSelection}
        loading={state?.loading}
        className="mt-10 mb-10 table-cursor-pointer-row"
        columns={typeOfRentals}
        onRow={(record, rowIndex) => {
          return {
            onClick: (event) => {
              setIsModalViewVisible(true);
              setDataModalTypeOfRentalView(record);
            }, // click row
          };
        }}
        // loading={data}
        dataSource={state?.dataResponse?.length > 0 ? state?.dataResponse : []}
      />
    </Fragment>
  );
};
