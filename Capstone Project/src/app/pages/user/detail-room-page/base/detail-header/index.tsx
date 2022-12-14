import React, { Fragment, useEffect, useState } from 'react';
import { Breadcrumb, Modal, Button, Input, message, Form } from 'antd';
import 'app/pages/user/detail-room-page/base/detail-header/style.scss';
import { Link, useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'types/RootState';
import {
  reportPostRequest,
  clearStateReport,
  addToFavouriteRequest,
  getListFavouriteRequest,
} from 'app/pages/user/detail-room-page/screen/action';

const { TextArea } = Input;

export const DetailHeader: React.FC<any> = () => {
  const dispatch = useDispatch();
  let { id }: any = useParams();
  const history = useHistory();
  const [form] = Form.useForm();
  const state = useSelector(
    (state: RootState) => state?.detailRoomReducer?.dataResponse
  );

  const token = localStorage.getItem('token');
  const userInfoCookies = localStorage.getItem('user-info');
  // const userInfoCookies = getCookie('user-info');
  let userInfo: any;

  if (userInfoCookies) {
    userInfo = JSON.parse(userInfoCookies);
  }

  const stateDetailRoom = useSelector(
    (state: RootState) => state?.detailRoomReducer
  );

  const stateStatus = useSelector(
    (state: RootState) => state?.detailRoomReducer?.status
  );

  const stateListFavourite = useSelector(
    (state: RootState) => state?.detailRoomReducer?.listFavourite
  );

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalReportVisible, setIsModaleportVisible] = useState(false);
  const [isFavourite, setFavourite] = useState(false);

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  useEffect(() => {
    if (token && userInfo?.role?.id) {
      dispatch(getListFavouriteRequest(''));
    }
  }, []);

  useEffect(() => {
    if (stateListFavourite?.posts?.length > 0) {
      stateListFavourite?.posts?.map((item: any) => {
        if (item?.id === parseInt(id)) {
          setFavourite(true);
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stateListFavourite]);

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    message.success('???? sao ch??p ???????ng d???n');
  };

  const onFinish = (values: any) => {
    if (id && values?.content) {
      const body = {
        postId: id,
        content: values?.content,
      };
      dispatch(reportPostRequest(body));
    }
  };

  useEffect(() => {
    if (stateStatus === 'reported' && isModalReportVisible) {
      dispatch(clearStateReport(''));
      message.success({
        content: '???? g???i b??o c??o th??nh c??ng!',
        style: {
          marginTop: '100px',
        },
      });
      setIsModaleportVisible(false);
      form.resetFields();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stateStatus]);

  return (
    <Fragment>
      <div className="detail__header__container">
        <Breadcrumb>
          <Breadcrumb.Item>
            <Link to="/">Trang ch???</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            {state?.phuongXa ? state?.phuongXa : ''}
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            {state?.houseName ? state?.houseName : ''}
          </Breadcrumb.Item>
        </Breadcrumb>

        <div className="flex detail__header__social">
          <div
            className="cursor-pointer mr-30"
            onClick={() => {
              if (token && userInfo?.role?.id) {
                setIsModaleportVisible(true);
              } else {
                history.push('/sign-in');
              }
            }}
          >
            <i className="fa-solid fa-flag mr-5" style={{ fontSize: 12 }}></i>{' '}
            B??o c??o
          </div>
          <div
            className="cursor-pointer mr-30"
            onClick={() => setIsModalVisible(true)}
          >
            <i className="fa-solid fa-share mr-5"></i> Chia s???
          </div>
          <div className="cursor-pointer">
            {isFavourite ? (
              <div
                onClick={() => {
                  if (token && userInfo?.role?.id) {
                    if (id) {
                      setFavourite(false);
                      dispatch(
                        addToFavouriteRequest({
                          postId: id,
                        })
                      );
                    }
                  } else {
                    history.push('/sign-in');
                  }
                }}
              >
                <i
                  className="fa-solid fa-heart mr-5"
                  style={{ color: '#F67539' }}
                ></i>{' '}
                Y??u th??ch
              </div>
            ) : (
              <div
                onClick={() => {
                  if (token && userInfo?.role?.id) {
                    if (id) {
                      setFavourite(true);
                      dispatch(
                        addToFavouriteRequest({
                          postId: id,
                        })
                      );
                    }
                  } else {
                    history.push('/sign-in');
                  }
                }}
              >
                <i className="fa-regular fa-heart mr-5"></i>
                Y??u th??ch
              </div>
            )}
          </div>
        </div>
      </div>

      <Modal
        title={state?.post?.house?.name}
        visible={isModalVisible}
        onOk={copyLink}
        okText="Sao ch??p ???????ng d???n"
        cancelText="????ng"
        onCancel={handleCancel}
      >
        <div>
          {state?.post?.room?.roomCategory?.name}{' '}
          {state?.post?.room?.roomType?.name}
        </div>
      </Modal>

      <Modal
        title={'B??o c??o vi ph???m'}
        visible={isModalReportVisible}
        okText="Sao ch??p ???????ng d???n"
        onCancel={() => setIsModaleportVisible(false)}
        footer={null}
      >
        <Form form={form} layout="vertical" name="basic" onFinish={onFinish}>
          <Form.Item
            label="N???i dung b??o c??o"
            name="content"
            rules={[
              { required: true, message: 'Nh???p n???i dung b??o c??o!' },
              {
                max: 100,
                message: 'Nh???p n???i dung b??o c??o 1000 k?? t???!',
              },
            ]}
          >
            <TextArea
              rows={4}
              placeholder="Nh???p n???i dung b??o c??o"
              maxLength={1000}
            />
          </Form.Item>
          <div
            style={{
              marginTop: 30,
              display: 'flex',
              width: '100%',
              justifyContent: 'flex-end',
            }}
          >
            <Button
              onClick={() => setIsModaleportVisible(false)}
              style={{ backgroundColor: '#fff', marginRight: 10 }}
            >
              Hu???
            </Button>
            <Button
              loading={stateDetailRoom?.btnReportLoading}
              htmlType="submit"
              style={{
                backgroundColor: '#1890ff',
                borderColor: '#1890ff',
                color: 'white',
              }}
            >
              G???i
            </Button>
          </div>
        </Form>
      </Modal>
    </Fragment>
  );
};
