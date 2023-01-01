import React from 'react';

type IProps = {
  content: (props: any) => JSX.Element;
};

export const FragmentLayout: React.FC<IProps> = ({ content: Content }) => {
  return (
    <React.Fragment>
      <Content />
    </React.Fragment>
  );
};
