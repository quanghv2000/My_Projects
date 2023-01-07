import { Table, Button, Modal, message } from 'antd';
import React, { Fragment, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'types/RootState';
import 'app/pages/landlord/landlord-house-page/base/house-data-table/style.scss';
import Moment from 'react-moment';
import { useDispatch } from 'react-redux';
import {
  deleteDataBankAccountRequest,
  getDataBankAccountRequest,
} from 'app/pages/admin/admin-bank-account-management-page/screen/action';
import BankAccountView from 'app/pages/admin/admin-bank-account-management-page/base/bank-account-view/index';
import BankAccountCreate from 'app/pages/admin/admin-bank-account-management-page/base/bank-account-create/index';

const { confirm } = Modal;

export const BankAccountList: React.FC<any> = () => {
  const dispatch = useDispatch();
  const [isModalViewVisible, setIsModalViewVisible] = useState(false);
  const [isModalCreateVisible, setIsModalCreateVisible] = useState(false);
  const [dataModalBankAccountView, setDataModalBankAccountView] = useState({});
  const success = () => {
    message.success({
      content: 'Xoá thành công',
      className: 'custom-class',
    });
  };

  const state = useSelector(
    (state: RootState) => state?.adminBankAccountPageReducer
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
      dispatch(getDataBankAccountRequest(''));
      success();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state?.statusDelete]);

  const showConfirmDelete = () => {
    confirm({
      title: `Bạn có chắc chắn muốn xóa ${selectedRowKeys.length} tài khoản ngân hàng?`,
      okText: 'Xác nhận',
      cancelText: 'Huỷ',
      onOk() {
        let list: any = [];
        selectedRow.forEach((item) => {
          list.push(item.id);
        });
        dispatch(deleteDataBankAccountRequest({ list }));
      },
      onCancel() {},
    });
  };

  const BankAccounts: any = [
    {
      title: 'STT',
      dataIndex: 'index',
      key: 'index',
      // align: 'center',
      // width: 100,
      render: (text, record, index) => <b>{index + 1}</b>,
    },
    {
      title: 'Tên ngân hàng',
      dataIndex: 'bankName',
      key: 'bankName',
      render: (bankName) => <span>{bankName}</span>,
    },
    {
      title: 'Chủ tài khoản',
      dataIndex: 'username',
      key: 'username',
      render: (bankName) => <span>{bankName}</span>,
    },
    {
      title: 'Số tài khoản',
      dataIndex: 'numberAccount',
      key: 'numberAccount',
      render: (bankName) => <span>{bankName}</span>,
    },
    {
      title: 'Chi nhánh',
      dataIndex: 'branch',
      key: 'branch',
      render: (branch) => <span>{branch}</span>,
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
      <BankAccountView
        isModalViewVisible={isModalViewVisible}
        data={dataModalBankAccountView}
        setIsModalViewVisible={(visibale) => setIsModalViewVisible(visibale)}
      />
      <BankAccountCreate
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
        Quản Lý Tài Khoản Ngân Hàng
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
            Tổng số tài khoản ngân hàng: {state?.dataResponse?.length}
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
            <strong>Thêm tài khoản</strong>
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
        columns={BankAccounts}
        onRow={(record, rowIndex) => {
          return {
            onClick: (event) => {
              setIsModalViewVisible(true);
              setDataModalBankAccountView(record);
            }, // click row
          };
        }}
        // loading={data}
        dataSource={state?.dataResponse?.length > 0 ? state?.dataResponse : []}
      />
    </Fragment>
  );
};
