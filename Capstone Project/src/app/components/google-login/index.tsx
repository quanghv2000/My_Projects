import { Button } from 'antd';
import 'app/components/google-login/style.scss';
import GoogleImage from 'assets/authentication/google.png';
import React, { Fragment, useEffect, useState } from 'react';
import GoogleLogin from 'react-google-login';
import { useDispatch } from 'react-redux';
import { signUpWithGGRequest } from 'app/pages/authentication/signup-page/screen/action';
import {
  signInWithGGRequest,
  signInUserInformationRequest,
} from 'app/pages/authentication/signin-page/screen/action';
import { useSelector } from 'react-redux';
import { RootState } from 'types/RootState';

export const GoogleLoginComponent: React.FC<any> = (props: any) => {
  const dispatch = useDispatch();
  // clear msg,old state when access page

  const state = useSelector((state: RootState) => state?.signUpReducer);

  // use token to sign in
  useEffect(() => {
    if (state?.token) {
      dispatch(signInUserInformationRequest({}));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state?.token]);

  const responseGoogle = async (response) => {
    let googleResponse = await response;
    if (googleResponse) {
      if (props?.title === 'Đăng ký') {
        const givenName = googleResponse?.profileObj?.givenName || '';
        const familyName = googleResponse?.profileObj?.familyName || '';
        const body = {
          email: googleResponse?.profileObj?.email,
          fullName: givenName + familyName,
          imageLink: googleResponse?.profileObj?.imageUrl,
          role:
            props?.tabs === 'Landlord'
              ? { id: 3, role: 'ROLE_LANDLORD' }
              : {
                  id: 2,
                  role: 'ROLE_USER',
                },
        };
        if (body?.email && body?.fullName && body) {
          dispatch(signUpWithGGRequest(body));
        }
      }
      if (props?.title === 'Đăng nhập') {
        const givenName = googleResponse?.profileObj?.givenName || '';
        const familyName = googleResponse?.profileObj?.familyName || '';
        const body = {
          email: googleResponse?.profileObj?.email,
          fullName: givenName + familyName,
          imageLink: googleResponse?.profileObj?.imageUrl,
        };
        if (body?.email && body?.fullName && body) {
          dispatch(signInWithGGRequest(body));
        }
      }
    }
  };
  
  return (
    <Fragment>
      <div className="google__login__container">
        <GoogleLogin
          disabled={
            props?.title === 'Đăng nhập'
              ? false
              : props?.disabled
              ? false
              : true
          }
          clientId="1079345342714-8q3900edhd8glu594i1kbgovile1bgio.apps.googleusercontent.com"
          render={(renderProps) => (
            <div className="google__login__item">
              <Button
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
                className="google__login--btn"
              >
                <div className="google__login--image--container">
                  <img
                    src={GoogleImage}
                    className="google__login--image"
                    alt="Google"
                  />
                </div>
                <span className="google__login--title">
                  {props.title} với Google
                </span>
              </Button>
            </div>
          )}
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
          cookiePolicy={'single_host_origin'}
        />{' '}
      </div>
    </Fragment>
  );
};
