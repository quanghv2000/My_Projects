import React from 'react';

import { HeaderMain, HeaderMenu, HeaderTop } from './components';

import './header.css';

type IProps = {};

export const Header: React.FC<IProps> = () => {
  return (
    <header className="header clearfix">
      <HeaderTop />
      <HeaderMain />
      <HeaderMenu />
    </header>
  );
};
