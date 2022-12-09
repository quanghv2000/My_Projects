import React, { FunctionComponent } from 'react';
import { LoadingSpinner } from 'app/components/loading-spinner';
import { SignInModal, SignUpModal } from 'app/modals';
import { useSelector } from 'react-redux';
import { IRootState } from 'types/RootState';
import { Header } from './components';

type IProps = {
  content: FunctionComponent<any>;
};

export const MainLayout: React.FC<IProps> = (props) => {
  /** @Stored_Data */
  const storedData = useSelector((state: IRootState) => state);
  const { loadingSpinner } = storedData.GlobalReducer;

  /** @Props_Value */
  const { content: Content } = props;

  return (
    <>
      <Header />
      <Content />
      <SignInModal />
      <SignUpModal />
      <LoadingSpinner isLoading={loadingSpinner} />
      {/* <Footer /> */}
    </>
  );
};
