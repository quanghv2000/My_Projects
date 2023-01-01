import React from 'react';
import { Footer } from './footer';
import { Header } from './header';

type IProps = {
  content: (props: any) => JSX.Element;
};

export const UserLayout: React.FC<IProps> = ({ content: Content }) => {
  return (
    <React.Fragment>
      <Header />
      <div style={{ minHeight: '600px' }}>
        <Content />
      </div>
      <Footer />
    </React.Fragment>
  );
};
