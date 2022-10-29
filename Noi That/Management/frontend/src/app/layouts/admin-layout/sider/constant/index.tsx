import React from 'react';
import { MenuItem } from '../types';
import {
  ContainerOutlined,
  DesktopOutlined,
  PieChartOutlined,
} from '@ant-design/icons';

export function getItem(
  label: React.ReactNode,
  key: React.Key,
  path: string,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: 'group',
): MenuItem {
  return {
    label,
    key,
    path,
    icon,
    children,
    type,
  } as MenuItem;
}

export const menuItems: MenuItem[] = [
  getItem('Dashboard', 'dashboard', '/admin/dashboard', <PieChartOutlined />),
  getItem(
    'Quản lý người dùng',
    'quan-ly-nguoi-dung',
    '/admin/quan-ly-nguoi-dung',
    <DesktopOutlined />,
  ),
  getItem(
    'Quản lý danh mục',
    'quan-ly-danh-muc',
    '/admin/quan-ly-danh-muc',
    <DesktopOutlined />,
  ),
  getItem(
    'Quản lý hệ thống',
    'quan-ly-he-thong',
    '/admin/quan-ly-he-thong',
    <ContainerOutlined />,
  ),
  getItem(
    'Example Antd',
    'example-antd',
    '/admin/example-antd',
    <ContainerOutlined />,
  ),
  // getItem('Navigation One', 'sub1', <MailOutlined />, [
  //   getItem('Option 5', '5'),
  //   getItem('Option 6', '6'),
  //   getItem('Option 7', '7'),
  //   getItem('Option 8', '8'),
  // ]),

  // getItem('Navigation Two', 'sub2', <AppstoreOutlined />, [
  //   getItem('Option 9', '9'),
  //   getItem('Option 10', '10'),

  //   getItem('Submenu', 'sub3', null, [
  //     getItem('Option 11', '11'),
  //     getItem('Option 12', '12'),
  //   ]),
  // ]),
];
