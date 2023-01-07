import { MailOutlined, ApartmentOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import { Link } from 'react-router-dom';

const MenuChild = [
  {
    title: 'Thống kê tổng quan',
    key: 'admin-dashboard',
    icon: <i className="fa-solid fa-chart-bar"></i>,
    path: '/admin/dashboard',
  },
  {
    title: 'Quản lý đăng tin',
    key: 'post-management',
    icon: <i className="fab fa-wpforms"></i>,
    path: '/admin/post-management',
  },
  {
    title: 'Quản lý tài khoản',
    key: 'account-management',
    icon: <i className="fa-solid fa-users"></i>,
    path: '/admin/account-management',
  },
  {
    title: 'Quản lý giao dịch',
    key: 'transaction_management',
    icon: <i className="fa-solid fa-university"></i>,
    path: '/admin/transaction-management',
  },
  {
    title: 'Quản lý báo cáo',
    key: 'report-management',
    icon: <i className="fa-solid fa-flag"></i>,
    path: '/admin/report-management',
  },
  {
    title: 'Quản lý đánh giá',
    key: 'feedback-management',
    icon: <i className="fa-solid fa-comment"></i>,
    path: '/admin/feedback-management',
  },
  {
    title: 'Quản lý hệ thống',
    key: 'system_management',
    icon: <i className="fa-solid fa-cog"></i>,
    itemChild: [
      {
        title: 'Loại hình cho thuê',
        key: 'type-of-rental-management',
        // icon: <i className="fa-solid fa-hotel"></i>,
        path: '/admin/type-of-rental-management',
      },
      {
        title: 'Danh mục phòng trọ',
        key: 'room-category-management',
        // icon: <i className="fa-solid fa-hotel"></i>,
        path: '/admin/room-category-management',
      },
      {
        title: 'Các loại phòng',
        key: 'room-type-management',
        // icon: <i className="fa-solid fa-bed"></i>,
        path: '/admin/room-type-management',
      },
      {
        title: 'Quản lý tiện nghi',
        key: 'amenity-management',
        // icon: <i className="fa-solid fa-bed"></i>,
        path: '/admin/amenity-management',
      },
      {
        title: 'Địa điểm bản đồ',
        key: 'map-position',
        // icon: <i className="fa-solid fa-house"></i>,
        path: '/admin/map-position',
      },
      {
        title: 'Chi phí đăng tin',
        key: 'posting-cost',
        // icon: <i className="fa-solid fa-bed"></i>,
        path: '/admin/posting-cost-management',
      },
      {
        title: 'Tài khoản ngân hàng',
        key: 'bank-account-management',
        // icon: <i className="fa-solid fa-bed"></i>,
        path: '/admin/bank-account-management',
      },
    ],
  },
  // {
  //   title: 'Báo cáo',
  //   key: 'baocao',
  //   icon: <i className="fa-solid fa-database"></i>,
  //   itemChild: [
  //     {
  //       title: 'Báo cáo lời lỗ',
  //       key: 'item11',
  //       path: '/host/rooms',
  //     },
  //     {
  //       title: 'Danh sách khách thuê phòng',
  //       key: 'item12',
  //       path: '/host/rooms',
  //     },
  //     {
  //       title: 'Danh sách khách đang thuê phòng',
  //       key: 'item13',
  //       path: '/host/rooms',
  //     },
  //     {
  //       title: 'Danh sách khách nợ tiền phòng',
  //       key: 'item14',
  //       path: '/host/rooms',
  //     },
  //     {
  //       title: 'Danh sách khách sắp hết hợp đồng',
  //       key: 'item15',
  //       path: '/host/rooms',
  //     },
  //     {
  //       title: 'Danh sách khách thuê đặt cọc',
  //       key: 'item16',
  //       path: '/host/rooms',
  //     },
  //     {
  //       title: 'Chi tiết hoá đơn',
  //       key: 'item17',
  //       path: '/host/rooms',
  //     },
  //   ],
  // },
];

export const menuItem = (location: any) =>
  MenuChild.map((item: any) => {
    return item?.itemChild?.length > 0 &&
      item?.itemChild?.length !== undefined ? (
      <Menu.SubMenu key={item?.key} icon={item?.icon} title={item?.title}>
        {item?.itemChild?.map((itemChild: any) => {
          return (
            <Menu.Item
              className={
                location.pathname === itemChild?.path
                  ? 'active__menu--sider'
                  : ''
              }
              key={itemChild?.key}
              icon={itemChild?.icon}
            >
              <Link
                to={itemChild?.path}
                className={
                  location.pathname === itemChild?.path
                    ? 'active__menu--sider-link'
                    : ''
                }
              >
                {itemChild?.title}
              </Link>
            </Menu.Item>
          );
        })}
      </Menu.SubMenu>
    ) : (
      <Menu.Item
        className={
          location.pathname === item?.path ? 'active__menu--sider' : ''
        }
        key={item?.key}
        icon={item?.icon}
      >
        <Link
          to={item?.path}
          className={
            location.pathname === item?.path ? 'active__menu--sider-link' : ''
          }
        >
          {item?.title}
        </Link>
      </Menu.Item>
    );
  });
