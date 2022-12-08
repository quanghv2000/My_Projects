import React, { FunctionComponent } from 'react';
import { Header, Footer } from './components';

type IProps = {
  content: FunctionComponent<any>;
};

export const MainLayout: React.FC<IProps> = (props) => {
  const { content: Content } = props;

  return (
    <>
      <Header />
      <Content />
      <Footer />
    </>
  );
};
