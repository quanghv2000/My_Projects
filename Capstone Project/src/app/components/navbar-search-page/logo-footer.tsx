import * as React from 'react';
import { Wrapper, TitleLink, Description } from 'app/components/navbar/styled';
import LogoWeb from 'assets/download.svg';

export const Logo: React.FC<any> = () => {
  return (
    <Wrapper>
      <TitleLink to={process.env.PUBLIC_URL + '/'}>
        <img style={{ height: 35 }} src={LogoWeb} alt="logo" />
      </TitleLink>
      <Description>
        {' '}
        | <span className="bold">Hola Houses</span>
      </Description>
    </Wrapper>
  );
};
