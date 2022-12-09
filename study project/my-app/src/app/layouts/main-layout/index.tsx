import React, { FunctionComponent } from 'react';
import { LoadingSpinner } from 'app/components/loading-spinner';
import { SignInModal, SignUpModal } from 'app/modals';
import { useSelector, useDispatch } from 'react-redux';
import { IRootState } from 'types/RootState';
import { LocalStorage } from 'utils/constants';
import { Header } from './components';
import { getUserInfoLoggedRequestAction } from './actions';

type IProps = {
  content: FunctionComponent<any>;
};

export const MainLayout: React.FC<IProps> = (props) => {
  /** @Localstorage_Data */
  const accessToken = localStorage.getItem(LocalStorage.ACCESS_TOKEN);
  console.log('accessToken: ', accessToken);

  /** @Stored_Data */
  const storedData = useSelector((state: IRootState) => state);
  const { loadingSpinner } = storedData.GlobalReducer;

  /** @Props_Value */
  const { content: Content } = props;

  /** @Dispacth_Store */
  const dispatch = useDispatch();

  /** @Effect */
  React.useLayoutEffect(() => {
    if (!accessToken) {
      return;
    }

    dispatch(getUserInfoLoggedRequestAction());
  }, [accessToken]);

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
