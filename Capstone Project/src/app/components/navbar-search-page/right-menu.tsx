import React, { Fragment } from 'react';
import { Menu, Grid } from 'antd';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { translations } from 'locales/translations';
import { LanguageSwitch } from 'app/components/language-switch';
// const SubMenu = Menu.SubMenu;
// const MenuItemGroup = Menu.ItemGroup;

const { useBreakpoint } = Grid;

export const RightMenu: React.FC<any> = () => {
  const menuRight: any = () => {
    return (
      <Menu mode={md ? 'horizontal' : 'inline'}>
        {/* <div
            style={
              md
                ? { width: '100%', display: 'flex', justifyContent: 'flex-end' }
                : { paddingLeft: 24 }
            }
          > */}
        <Menu.Item className="item__navbar" key="navbar-blog">
          <Link to={process.env.PUBLIC_URL + '/blog'}>
            {t(translations.navbarFeature.blog)}
            <i className="fa-brands fa-blogger ml-5"></i>
          </Link>
        </Menu.Item>
        <Menu.Item key="navbar-host">
          <Link to={process.env.PUBLIC_URL + '/host'}>
            {t(translations.navbarFeature.host)}
          </Link>
        </Menu.Item>
        <Menu.Item key="navbar-sign-up">
          <Link to={process.env.PUBLIC_URL + '/sign-up'}>
            {t(translations.navbarFeature.sign_up)}
          </Link>
        </Menu.Item>
        <Menu.Item key="navbar-sign-in">
          <Link to={process.env.PUBLIC_URL + '/sign-in'}>
            {t(translations.navbarFeature.sign_in)}
          </Link>
        </Menu.Item>
        <Menu.Item key="navbar-language">
          <LanguageSwitch />
        </Menu.Item>
        {/* </div> */}
      </Menu>
    );
  };

  const { t } = useTranslation();
  const { md } = useBreakpoint();
  return <Fragment>{menuRight()}</Fragment>;
};
