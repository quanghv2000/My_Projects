import { Modal, Spin } from 'antd';
import { PersonalInformationPage } from 'app/pages/landlord/host-profile-page/base/personal-information';
import { getUserInfoByIdRequest } from 'app/pages/landlord/host-profile-page/screen/action';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'types/RootState';

const AccountView = (props) => {
  const state = useSelector((state: RootState) => state?.hostProfileReducer);

  const dispatch = useDispatch();
  useEffect(() => {
    if (props?.data?.id) {
      dispatch(getUserInfoByIdRequest({ id: props?.data?.id }));
    }
  }, [props?.data?.id]);

  return (
    <>
      <Modal
        visible={props.isModalViewVisible}
        onCancel={() => props.setIsModalViewVisible(false)}
        footer={null}
        cancelText="Đóng"
        okText="Sửa"
        width="750px"
      >
        <Spin spinning={state?.loadingGetUser} delay={100}>
          <div style={{ marginTop: 20 }}>
            <PersonalInformationPage id={props?.data?.id} role={'admin'} />
          </div>
        </Spin>
      </Modal>
    </>
  );
};

export default AccountView;
