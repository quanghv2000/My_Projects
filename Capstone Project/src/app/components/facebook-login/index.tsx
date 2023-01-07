import React, { Fragment } from 'react';
// import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import { Button } from 'antd';
import FacebookImage from 'assets/authentication/facebook.png';
import 'app/components/facebook-login/style.scss';

export const FacebookLoginComponent: React.FC<any> = () => {
  const responseFacebook = (response) => {
  };
  return (
    <Fragment>
      <div className="facebook__login__container">
        {/* <FacebookLogin
          appId="2778734095744532"
          autoLoad={true}
          render={(renderProps) => (
            <div className="facebook__login__item">
              <Button
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
                className="facebook__login--btn"
              >
                <div className="facebook__login--image--container">
                  <img
                    src={FacebookImage}
                    className="facebook__login--image"
                    alt="facebook"
                  />
                </div>

                <span className="facebook__login--title">
                  Sign in with Facebook
                </span>
              </Button>
            </div>
          )}
          fields="name,email,picture"
          // onClick={componentClicked}
          callback={responseFacebook}
        /> */}
      </div>
    </Fragment>
  );
};
