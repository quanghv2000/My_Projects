import { UserFooterLayout, UserHeaderLayout } from './components';

export const UserLayout = Content => {
  return function () {
    return (
      <div>
        <UserHeaderLayout />
        <Content />
        <UserFooterLayout />
      </div>
    );
  };
};
