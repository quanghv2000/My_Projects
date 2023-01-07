// import { NavbarWrapper } from 'app/components/page-wrapper';
import { Fragment, useState } from 'react';
// import styled from 'styled-components/macro';
// import { StyleConstants } from 'styles/StyleConstants';
import { SearchBar } from 'app/components/search-bar';
import { Logo } from './Logo';
// import { LanguageSwitch } from 'app/components/language-switch';
import { Button, Drawer } from 'antd';
import { RightMenu } from 'app/components/navbar/right-menu';
import { RightMenuPC } from 'app/components/navbar/right-menu-pc';
import 'app/components/navbar/style.scss';

export interface NavBarProps {
  navbarfixed?: boolean;
}

export const NavBar: React.FC<any> = ({ navbarfixed }: NavBarProps) => {
  const [visible, setVisible] = useState(false);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  return (
    <Fragment>
      {/* <nav className="menuBar"> */}
      <nav className={`${navbarfixed ? 'menuBar' : 'menuBar menuBarStatic'}`}>
        <div className="menuBar--item">
          <div className="logo">
            <Logo />
          </div>
          <div className="menuBar__searchBar">
            <div className="menuBar__searchBar--comp">
              <div className="menuBar__searchBar--area">
                <SearchBar />
              </div>
              <div className="menuCon">
                <div className="rightMenu">
                  <RightMenuPC />
                </div>
                <Button
                  className="barsMenu"
                  type="primary"
                  onClick={showDrawer}
                >
                  <span className="barsBtn"></span>
                </Button>
                <Drawer
                  title={
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                      }}
                    >
                      <p>Hola Houses</p>
                      <i
                        className="fa-solid fa-x mt-10 cursor-pointer"
                        onClick={onClose}
                      ></i>
                    </div>
                  }
                  placement="right"
                  closable={false}
                  onClose={onClose}
                  visible={visible}
                >
                  <RightMenu />
                </Drawer>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </Fragment>
  );
};
