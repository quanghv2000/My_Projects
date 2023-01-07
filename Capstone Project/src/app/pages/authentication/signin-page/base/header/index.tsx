import { Row } from 'antd';
import { LanguageSwitch } from 'app/components/language-switch';
import { TitleLink } from 'app/components/navbar/styled';
import 'app/pages/authentication/signin-page/base/header/style.scss';
import LogoWeb from 'assets/download.svg';
import React, { Fragment } from 'react';

export const SignInHeader: React.FC<any> = () => {
  return (
    <Fragment>
      <Row className="header" justify="space-between">
        <TitleLink className="header__logo" to={process.env.PUBLIC_URL + '/'}>
          <img src={LogoWeb} alt="logo" />
          <div className="header__logo-name">Hola Houses</div>
        </TitleLink>

        {/* <Row className="header__languages">
          <LanguageSwitch />
        </Row> */}
      </Row>
    </Fragment>
  );
};
