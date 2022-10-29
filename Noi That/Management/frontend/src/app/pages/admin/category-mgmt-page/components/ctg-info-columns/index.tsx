import { ColumnsType } from 'antd/lib/table';
import { ICategoryInfo } from 'models/api-model/response';
import { ColumnAction } from './column-action';
import { ColumnDate } from './column-date';
import { ColumnIndex } from './column-index';
import { ColumnSubCtg } from './column-subctg';

export const ctgInfoColumns: ColumnsType<ICategoryInfo> = [
  {
    title: '#',
    dataIndex: 'index',
    key: 'index',
    render: (_, record, index) => <ColumnIndex index={index} />,
  },
  {
    title: 'Tên danh mục',
    dataIndex: 'name',
    key: 'name',
    render: name => <span>{name}</span>,
  },
  {
    title: 'Số danh mục con',
    dataIndex: 'subCategories',
    key: 'subCategories',
    render: (_, { subCategories }) => (
      <ColumnSubCtg subCategories={subCategories} />
    ),
  },
  {
    title: 'Ngày tạo',
    dataIndex: 'createdDate',
    key: 'createdDate',
    render: createdDate => <ColumnDate date={createdDate} />,
  },
  {
    title: 'Người tạo',
    dataIndex: 'createdBy',
    key: 'createdBy',
    render: createdBy => <span>{createdBy}</span>,
  },
  {
    title: 'Lần chỉnh sửa cuối',
    dataIndex: 'lastmodifiedDate',
    key: 'lastmodifiedDate',
    render: lastmodifiedDate => <ColumnDate date={lastmodifiedDate} />,
  },
  {
    title: 'Người chỉnh sửa',
    dataIndex: 'lastmodifiedBy',
    key: 'lastmodifiedBy',
    render: lastmodifiedBy => <span>{lastmodifiedBy}</span>,
  },
  {
    title: 'Tác vụ',
    dataIndex: 'action',
    key: 'action',
    width: '15%',
    render: (_, record) => <ColumnAction record={record} />,
  },
];
