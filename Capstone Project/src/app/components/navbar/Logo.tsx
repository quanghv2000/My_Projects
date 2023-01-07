import * as React from 'react';
import { Wrapper, TitleLink } from 'app/components/navbar/styled';
import LogoWeb from 'assets/download.svg';
import 'app/components/navbar/style.scss';

export const Logo: React.FC<any> = () => {
  return (
    <Wrapper>
      <TitleLink to={process.env.PUBLIC_URL + '/'}>
        <div className="logo__container">
          <img src={LogoWeb} alt="logo" />
          <div className="logo__name">Hola</div>
        </div>
      </TitleLink>
    </Wrapper>
  );
};
