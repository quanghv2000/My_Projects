import React, { Fragment, useEffect, useRef, useState } from 'react';
import {
  Comment,
  Avatar,
  Form,
  Button,
  List,
  Input,
  Rate,
  Tooltip,
  Spin,
} from 'antd';
import moment from 'moment';
import 'app/pages/user/detail-room-page/base/feedback-user/style.scss';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'types/RootState';
import {
  createFeedbackRequest,
  getListFeedbackRequest,
  updateFeedbackRequest,
} from 'app/pages/user/detail-room-page/screen/action';
import { Link, useParams } from 'react-router-dom';
import { StarFilled } from '@ant-design/icons';

const { TextArea } = Input;

export const FeedbackUser: React.FC<any> = () => {
  const myRef: any = useRef(null);
  const state = useSelector(
    (state: RootState) => state?.detailRoomReducer?.dataResponse
  );

  const stateUser = useSelector(
    (state: RootState) => state?.hostProfileReducer
  );

  const stateRoomReducer = useSelector(
    (state: RootState) => state?.detailRoomReducer
  );

  const stateListFeedback = useSelector(
    (state: RootState) => state?.detailRoomReducer?.listFeedback
  );

  const loadingFeedback = useSelector(
    (state: RootState) => state?.detailRoomReducer?.loadingFeedback
  );

  const token = localStorage.getItem('token');
  const userInfoCookies = localStorage.getItem('user-info');
  // const userInfoCookies = getCookie('user-info');
  let userInfo: any;

  if (userInfoCookies) {
    userInfo = JSON.parse(userInfoCookies);
  }

  const dispatch = useDispatch();
  let { id }: any = useParams();
  const [isFeedback, setFeedback] = useState(false);
  const [isEditFeedback, setEditFeedback] = useState(false);
  const [starEdit, setStarEdit] = useState(5);
  const [idFeedback, setIdFeedback]: any = useState('');

  useEffect(() => {
    if (stateRoomReducer?.message === 'feedback-created') {
      dispatch(getListFeedbackRequest({ id: id }));
    }

    if (stateRoomReducer?.message === 'feedback-updated') {
      setIdFeedback('');
      setStarEdit(5);
      formEdit?.setFieldsValue({
        content: '',
      });
      setEditFeedback(false);
      dispatch(getListFeedbackRequest({ id: id }));
    }
  }, [stateRoomReducer?.message]);

  useEffect(() => {
    if (id) {
      dispatch(getListFeedbackRequest({ id: id }));
    }
  }, [id]);

  useEffect(() => {
    if (stateListFeedback?.feedbackDtos?.length > 0) {
      stateListFeedback?.feedbackDtos?.map((item: any) => {
        if (item?.user?.username === userInfo?.username) {
          setFeedback(true);
        }
      });
    }
  }, [stateListFeedback?.feedbackDtos]);

  const executeScroll = () =>
    myRef.current.scrollIntoView({
      behavior: 'smooth',
    });

  const CommentList = ({ comments }) => (
    <List
      dataSource={comments}
      header={
        <div>
          <StarFilled style={{ color: '#fadb14', marginRight: 3 }} />
          {` ${Number.parseFloat(stateListFeedback?.averageRating).toFixed(
            1
          )} · ${stateListFeedback?.countFeedback} đánh giá`}
        </div>
      }
      itemLayout="horizontal"
      // renderItem={(props: any) => <Comment {...props} />}
      renderItem={(props: any) => {
        return (
          <Comment
            author={
              <div>
                <span className="bold">
                  {props?.user?.fullName
                    ? props?.user?.fullName
                    : props?.user?.username}
                </span>
                <span className="ml-10">
                  {props?.rating} <StarFilled style={{ color: '#fadb14' }} />
                </span>
                <span>
                  {props?.user?.username === userInfo?.username ? (
                    <Button
                      onClick={() => {
                        setEditFeedback(true);
                        if (isEditFeedback) {
                          setIdFeedback('');
                          setStarEdit(5);
                          formEdit?.setFieldsValue({
                            content: '',
                          });
                          setEditFeedback(false);
                        } else {
                          setIdFeedback(props?.id);
                          setStarEdit(props?.rating);
                          formEdit?.setFieldsValue({
                            content: props.content,
                          });

                          executeScroll();
                        }
                      }}
                      type="link"
                      style={{ fontSize: 13, marginTop: 5 }}
                    >
                      {isEditFeedback ? 'Đóng' : 'Chỉnh sửa'}
                    </Button>
                  ) : (
                    ''
                  )}
                </span>
              </div>
            }
            avatar={
              <Avatar
                src={
                  props?.user?.imageLink
                    ? props?.user?.imageLink
                    : 'https://joeschmoe.io/api/v1/random'
                }
              />
            }
            content={
              <p>
                {props.content}
                <div style={{ color: ' #ccc', fontSize: 12 }}>
                  {/* <Tooltip
                    title={moment(props.createdDate)
                      .subtract(1, 'days')
                      .format('YYYY-MM-DD HH:mm:ss')}
                  > */}
                  <span>{moment(props.createdDate).fromNow()}</span>
                  {/* </Tooltip> */}
                </div>
              </p>
            }
          />
        );
      }}
    />
  );

  const onFinish = (values: any) => {
    const body = {
      postId: parseInt(id),
      rating: values?.star ? values?.star : 5,
      content: values?.content,
    };
    dispatch(createFeedbackRequest(body));
  };

  const onFinishEdit = (values: any) => {
    const body = {
      id: idFeedback ? parseInt(idFeedback) : '',
      rating: values?.star ? values?.star : 5,
      content: values?.content,
    };
    if (body?.id) {
      dispatch(updateFeedbackRequest(body));
    }
  };

  const [form] = Form.useForm();
  const [formEdit] = Form.useForm();

  const FeedbackForm = () => (
    <Form form={form} onFinish={onFinish}>
      <Form.Item
        name="content"
        rules={[
          {
            required: true,
            message: 'Nhập nội dung đánh giá!',
          },
        ]}
      >
        <TextArea rows={4} />
      </Form.Item>
      <Form.Item name="star" style={{ display: 'none' }}></Form.Item>
      <Form.Item>
        <Button
          htmlType="submit"
          loading={state?.loadingBtnCreateFeedback}
          type="primary"
        >
          Đánh giá
        </Button>
      </Form.Item>
    </Form>
  );

  const FeedbackFormEditor = () => (
    <Form form={formEdit} onFinish={onFinishEdit}>
      <Form.Item
        name="content"
        rules={[
          {
            required: true,
            message: 'Nhập nội dung đánh giá!',
          },
        ]}
      >
        <TextArea rows={4} />
      </Form.Item>
      <Form.Item name="star" style={{ display: 'none' }}></Form.Item>
      <Form.Item>
        <Button
          onClick={() => {
            setStarEdit(5);
            setIdFeedback('');
            formEdit?.setFieldsValue({
              content: '',
            });
            setEditFeedback(false);
          }}
        >
          Huỷ
        </Button>
        <Button
          htmlType="submit"
          className="ml-10"
          loading={state?.loadingBtnUpdateFeedback}
          type="primary"
        >
          Sửa Đánh giá
        </Button>
      </Form.Item>
    </Form>
  );

  return (
    <Fragment>
      <p className="feedback__user--title" ref={myRef}>
        Đánh giá
      </p>
      <Spin spinning={loadingFeedback} delay={100}>
        {token &&
        userInfo?.role?.id &&
        stateRoomReducer?.message !== 'feedback-created' &&
        !isFeedback ? (
          <div className="feedback__user">
            <Rate
              onChange={(values) => {
                form.setFieldsValue({
                  star: values,
                });
              }}
              allowHalf
              defaultValue={5}
              className="feedback__user__rating"
            />
            <Comment
              avatar={
                <Avatar
                  src={
                    stateUser?.userInfo?.imageLink
                      ? stateUser?.userInfo?.imageLink
                      : 'https://joeschmoe.io/api/v1/random'
                  }
                  alt="Han Solo"
                />
              }
              content={<FeedbackForm />}
            />
          </div>
        ) : (
          <div>
            {stateRoomReducer?.message !== 'feedback-created' &&
            !userInfo?.role?.id &&
            !token ? (
              <div>
                Bạn cần đăng nhập để đánh giá{' '}
                <Link
                  className="ml-10 mb-10"
                  to={process.env.PUBLIC_URL + '/sign-in'}
                >
                  Đăng nhập
                </Link>
              </div>
            ) : (
              ''
            )}
          </div>
        )}

        {isEditFeedback ? (
          <div className="feedback__user">
            <Rate
              onChange={(values) => {
                setStarEdit(values);
                formEdit.setFieldsValue({
                  star: values,
                });
              }}
              value={starEdit}
              allowHalf
              defaultValue={5}
              className="feedback__user__rating"
            />
            <Comment
              avatar={
                <Avatar
                  src={
                    stateUser?.userInfo?.imageLink
                      ? stateUser?.userInfo?.imageLink
                      : 'https://joeschmoe.io/api/v1/random'
                  }
                  alt="Han Solo"
                />
              }
              content={<FeedbackFormEditor />}
            />
          </div>
        ) : (
          ''
        )}

        {stateListFeedback?.feedbackDtos?.length > 0 && (
          <CommentList comments={stateListFeedback?.feedbackDtos} />
        )}
      </Spin>
    </Fragment>
  );
};
