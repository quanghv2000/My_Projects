import { NavLink, useHistory, useLocation } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import { menuItems } from './constant';

import style from './style.module.scss';

const { Sider } = Layout;

type IProps = {
  collapsed: boolean;
};

export default function LayoutSider(props: IProps) {
  /** @Props_Value */
  const { collapsed } = props;

  /** @Daclare */
  const history = useHistory();
  const location = useLocation();
  const selectedKey = location.pathname.split('/')[2];
  const siderStyle = collapsed ? 'siderCollapsed' : 'siderNormal';

  return (
    <Sider
      trigger={null}
      collapsible
      collapsed={collapsed}
      style={{
        backgroundColor: 'white',
        overflow: 'auto',
        height: '100vh',
        position: 'fixed',
        left: 0,
        top: 0,
        bottom: 0,
        transition: '0.35s',
      }}
      className={`${style['layout-sider']} ${style[siderStyle]}`}
    >
      <NavLink to={'/trang-chu'}>
        <div className={style['logo']}>
          <h3>Logo</h3>
        </div>
      </NavLink>
      <Menu
        selectedKeys={[selectedKey]}
        mode="inline"
        items={menuItems}
        className={style['menu']}
        onSelect={item => {
          history.push(`/admin/${item.key}`);
        }}
      />
    </Sider>
  );
}
