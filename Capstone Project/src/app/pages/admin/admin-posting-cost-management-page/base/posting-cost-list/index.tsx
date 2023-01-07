import { Table, Button, Modal, message } from 'antd';
import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'types/RootState';
import 'app/pages/landlord/landlord-house-page/base/house-data-table/style.scss';
import {
  getDataPostingCostRequest,
  deleteDataPostingCostRequest,
} from 'app/pages/admin/admin-posting-cost-management-page/screen/action';
import PostingCostView from 'app/pages/admin/admin-posting-cost-management-page/base/posting-cost-view/index';
import PostingCostCreate from 'app/pages/admin/admin-posting-cost-management-page/base/posting-cost-create/index';
import Moment from 'react-moment';
import { convertPrice } from 'helper/convert-price-to-vnd';

const columnsPostingCost = [
  {
    title: 'STT',
    dataIndex: 'index',
    key: 'index',
    render: (text, record, index) => <b>{index + 1}</b>,
  },
  {
    title: 'Loại tin đăng',
    dataIndex: 'type',
    key: 'type',
    render: (type) => <span>{type}</span>,
  },
  {
    title: 'Phí đăng tin',
    dataIndex: 'price',
    key: 'price',
    render: (price) => convertPrice(price) + ' vn₫/ngày',
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

// const postingCostsData = [
//   {
//     id: 1,
//     postType: 'Thường',
//     postCost: 3000,
//     createdDate: new Date(),
//     createdBy: 'quanghv7',
//   },
//   {
//     id: 2,
//     postType: 'VIP 1',
//     postCost: 5000,
//     createdDate: new Date(),
//     createdBy: 'quanghv7',
//   },
//   {
//     id: 3,
//     postType: 'VIP 2',
//     postCost: 7000,
//     createdDate: new Date(),
//     createdBy: 'quanghv7',
//   },
//   {
//     id: 4,
//     postType: 'VIP 3',
//     postCost: 10000,
//     createdDate: new Date(),
//     createdBy: 'quanghv7',
//   },
// ];

const { confirm } = Modal;

export const PostingCostList: React.FC<any> = () => {
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
      title: `Bạn có chắc chắn muốn xóa ${selectedRowKeys.length} loại tin đăng?`,
      okText: 'Xác nhận',
      cancelText: 'Huỷ',
      onOk() {
        let list: any = [];
        selectedRow.forEach((item) => {
          list.push(item.id);
        });
        dispatch(deleteDataPostingCostRequest({ list }));
      },
      onCancel() {},
    });
  };

  const state = useSelector(
    (state: RootState) => state?.adminPostingCostPageReducer
  );

  useEffect(() => {
    if (state && state?.statusDelete === 'delete' && state?.loading) {
      setSelectedRow();
      setSelectedRowKeys([]);
      dispatch(getDataPostingCostRequest(''));
      success();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state?.statusDelete]);

  const success = () => {
    message.success({
      content: 'Xoá thành công',
      className: 'custom-class',
    });
  };

  const PostingCosts =
    state?.dataResponse?.length > 0 ? state?.dataResponse : [];

  useEffect(() => {
    dispatch(getDataPostingCostRequest(''));
  }, []);

  return (
    <Fragment>
      <PostingCostView
        isModalViewVisible={isModalViewVisible}
        data={dataModalPostingCostView}
        setIsModalViewVisible={(visibale) => setIsModalViewVisible(visibale)}
      />
      <PostingCostCreate
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
        Quản Lý Chi Phí Đăng Tin
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
          <strong>Tổng số loại tin đăng: {PostingCosts?.length}</strong>
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
            <strong>Thêm loại tin đăng</strong>
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
