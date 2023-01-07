import { Result, Button, Spin } from 'antd';
import 'app/pages/authentication/signup-page/screen/style.scss';
import React, { Fragment, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { NavBar } from 'app/components/navbar';
import { ScrollToTop } from 'hooks/scroll-to-top';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'types/RootState';
import { verifyaAccountRequest } from 'app/pages/authentication/verify-account/action';

export const VerifyAccount: React.FC<any> = (props: any) => {
  const history = useHistory();
  const dispatch = useDispatch();

  const state = useSelector((state: RootState) => state?.verifyAccountReducer);

  useEffect(() => {
    if (props?.location?.search) {
      const code = props?.location?.search.replace('?code=', '');
      dispatch(verifyaAccountRequest({ code: code }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props?.location?.search]);

  return (
    <Fragment>
      <Helmet>
        <title>Sign Up</title>
        <meta name="description" content="Sign Up" />
      </Helmet>

      <ScrollToTop />
      <NavBar navbarfixed={true} />
      <Spin spinning={state?.loading} delay={100}>
        <div style={{ paddingTop: 100 }}>
          {state?.error ? (
            <Result
              status="error"
              title="Lỗi xác minh tài khoản"
              subTitle="Vui lòng kiểm tra lại email hoặc báo lại hệ thống bên Hola Houses để được hỗ trợ"
              extra={[
                <Button
                  onClick={() => {
                    history.push('/');
                  }}
                  type="primary"
                  key="console"
                >
                  Về trang chủ
                </Button>,
              ]}
            ></Result>
          ) : state?.message === 'success' ? (
            <Result
              status="success"
              title="Xác minh tài khoản thành công"
              subTitle="Bạn có thể đăng nhập để trải nghiệm dịch vụ một cách thuận tiện nhất"
              extra={[
                <Button
                  type="primary"
                  key="sign-in"
                  onClick={() => {
                    history.push('/sign-in');
                  }}
                >
                  Đăng nhập ngay
                </Button>,
                <Button
                  key="home"
                  onClick={() => {
                    history.push('/');
                  }}
                >
                  Về trang chủ
                </Button>,
              ]}
            />
          ) : (
            ''
          )}
        </div>
      </Spin>
    </Fragment>
  );
};
