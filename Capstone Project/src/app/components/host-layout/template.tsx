import { MailOutlined, ApartmentOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import { Link } from 'react-router-dom';

const MenuChild = [
  {
    title: 'Trang chủ',
    key: 'host',
    icon: <i className="fa-solid fa-house"></i>,
    path: '/host/dashboard',
  },
  {
    title: 'Thông tin cá nhân',
    key: 'host_profile',
    icon: <i className="fa-solid fa-user-alt"></i>,
    path: '/host/profile',
  },
  {
    title: 'Quản lý đăng tin',
    key: 'post-management',
    icon: <i className="fab fa-wpforms"></i>,
    path: '/host/post-management',
  },
  {
    title: 'Quản lý nhà',
    key: 'house',
    icon: <i className="fa-solid fa-hotel"></i>,
    path: '/host/house',
  },
  {
    title: 'Quản lý phòng',
    key: 'rooms',
    icon: <i className="fa-solid fa-warehouse"></i>,
    path: '/host/room',
  },
  // {
  //   title: 'Dịch vụ',
  //   key: 'service',
  //   icon: <i className="fab fa-servicestack"></i>,
  //   path: '/admin/service',
  // },
  // {
  //   title: 'Dịch vụ',
  //   key: 'service',
  //   icon: <ApartmentOutlined />,
  //   path: '/host/rooms',
  // },
  // {
  //   title: 'Chỉ số điện',
  //   key: 'electric-bill',
  //   icon: <i className="fa-solid fa-bolt"></i>,
  //   path: '/host/rooms',
  // },
  // {
  //   title: 'Chỉ số nước',
  //   key: 'water-bill',
  //   icon: <i className="fa-solid fa-droplet"></i>,
  //   path: '/host/rooms',
  // },
  // {
  //   title: 'Phát sinh',
  //   key: 'incurred-expenses',
  //   icon: <i className="fa-solid fa-pen"></i>,
  //   path: '/host/rooms',
  // },
  // {
  //   title: 'Tính tiền',
  //   key: 'calculate',
  //   icon: <i className="fa-solid fa-calculator"></i>,
  //   path: '/host/rooms',
  // },
  // {
  //   title: 'Phiếu chi',
  //   key: 'payment',
  //   icon: <i className="fa-solid fa-money-bill-1"></i>,
  //   path: '/host/rooms',
  // },
  // {
  //   title: 'Công việc',
  //   key: 'task',
  //   icon: <MailOutlined />,
  //   path: '/host/rooms',
  // },
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
                location.pathname.indexOf(item?.path) > -1
                  ? 'active__menu--sider'
                  : ''
              }
              key={itemChild?.key}
              icon={itemChild?.icon}
            >
              <Link
                to={itemChild?.path}
                className={
                  location.pathname.indexOf(item?.path) > -1
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
          location.pathname.indexOf(item?.path) > -1
            ? 'active__menu--sider'
            : ''
        }
        key={item?.key}
        icon={item?.icon}
      >
        <Link
          to={item?.path}
          className={
            location.pathname.indexOf(item?.path) > -1
              ? 'active__menu--sider-link'
              : ''
          }
        >
          {item?.title}
        </Link>
      </Menu.Item>
    );
  });
