import {
  Button,
  Col,
  DatePicker,
  Form,
  message,
  Modal,
  Row,
  Select,
} from 'antd';
import {
  clearHostPostCreate,
  createPostRequest,
  getListPostRequest,
  extendPostRequest,
} from 'app/pages/landlord/host-post-management-page/screen/action';
import { postDate } from 'app/pages/landlord/house-create-page/base/house-form-create/template';
import { hostHouseGetRequest } from 'app/pages/landlord/landlord-house-page/screen/action';
import { hostRoomGetRequest } from 'app/pages/landlord/landlord-room-page/screen/action';
import { convertPrice } from 'helper/convert-price-to-vnd';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { RootState } from 'types/RootState';
const { Option } = Select;

const PostCreate = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();

  // declare state
  const state = useSelector((state: RootState) => state?.hostPostPageReducer);

  const stateListRoom = useSelector(
    (state: RootState) => state?.hostRoomListReducer
  );

  const stateListHouse = useSelector(
    (state: RootState) => state?.houseListPageReducer
  );

  // declare state

  const [postState, setPostState]: any = useState({
    numberOfDays: 0,
    pricePostType: 0,
    totalPrice: 0,
  });

  const [form] = Form.useForm();

  // message success
  const success = () => {
    message.success({
      content: 'Đăng tin thành công',
      className: 'custom-class',
    });
  };

  // message success
  const successExtend = () => {
    message.success({
      content: 'Gia hạn thành công',
      className: 'custom-class',
    });
  };

  // check after create success to show message and redirect to list post
  useEffect(() => {
    if (state.statusCreate === 'created' && props?.keyModal === 'create') {
      success();
      dispatch(clearHostPostCreate(''));
      dispatch(getListPostRequest(''));
      props?.setIsModalCreateVisible(false);
      form.resetFields();
      setPostState({
        numberOfDays: 0,
        pricePostType: 0,
        totalPrice: 0,
      });
      history.push('/host/post-management');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.statusCreate]);

  // check after create success to show message and redirect to list post
  useEffect(() => {
    if (
      state.extendPostMsg === 'updated' &&
      props?.keyModal === 'detail' &&
      props?.isModalCreateVisible
    ) {
      successExtend();
      dispatch(clearHostPostCreate(''));
      dispatch(getListPostRequest(''));
      props?.setIsModalCreateVisible(false);
      form.resetFields();
      history.push('/host/post-management');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.extendPostMsg]);

  const userInfoCookies = localStorage.getItem('user-info');
  // const userInfoCookies = getCookie('user-info');
  let userInfo: any;

  if (userInfoCookies) {
    userInfo = JSON.parse(userInfoCookies);
  }

  //useEffect
  useEffect(() => {
    dispatch(hostHouseGetRequest(userInfo?.id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  useEffect(() => {
    if (stateListRoom?.dataResponse?.results?.length > 0) {
      form.setFieldsValue({
        room: '',
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stateListRoom?.dataResponse?.results]);

  // check after create success to show message and redirect to list post
  useEffect(() => {
    if (props?.data?.id && state?.dataResponsePostType) {
      const startDate = moment(
        moment(props?.data?.startDate).format('DD/MM/YYYY'),
        'DD/MM/YYYY'
      );
      form.setFieldsValue({
        house: props?.data?.houseName,
        room: props?.data?.roomName,
        postType: props?.data?.postType,
        startDate: startDate,
      });
      let priceInit = 0;
      const stateTypePost =
        state?.dataResponsePostType?.length > 0
          ? state?.dataResponsePostType
          : [];
      stateTypePost?.map((item: any) => {
        if (item?.id === props?.data?.postTypeId) {
          priceInit = item?.price;
        }
      });
      setPostState({
        ...postState,
        pricePostType: priceInit,
        numberOfDays: 0,
        totalPrice: 0,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props?.data?.id, state?.dataResponsePostType]);

  // function submit form
  const onFinish = (value: any) => {
    if (props?.title === 'Đăng tin mới') {
      const date = new Date(value?.startDate);
      const body = {
        house: {
          id: value?.house,
        },
        room: {
          id: value?.room,
        },
        postType: {
          id: value?.postType,
        },
        startDate: date.getTime(),
        numberOfDays: value?.numberOfDays,
      };
      dispatch(createPostRequest(body));
      // post extend gia hạn bài đăng
    } else {
      const body = {
        id: props?.data?.id,
        numberOfDays: value?.numberOfDays,
      };
      dispatch(extendPostRequest(body));
    }
  };

  const handleCancel = () => {
    form.resetFields();
    props?.setIsModalCreateVisible(false);
    if (props?.setDataItem) {
      props?.setDataItem({});
    }
  };

  const houseOnchange = (value) => {
    form.setFieldsValue({
      room: null,
    });
    dispatch(
      hostRoomGetRequest({
        pageSize: 100,
        pageIndex: 1,
        name: '',
        id: value,
      })
    );
  };

  // const disablePostType = (data) => {
  //   // disable for showing state
  //   if (
  //     data?.status === 'CENSORED' &&
  //     moment(data?.endDate) > moment() &&
  //     moment(data?.startDate) < moment()
  //   ) {
  //     return true;
  //   }
  //   // disable for waiting to show state
  //   if (
  //     data?.status === 'CENSORED' &&
  //     moment(data?.startDate) > moment() &&
  //     moment(data.endDate) >= moment()
  //   ) {
  //     return true;
  //   } else return false;
  // };

  return (
    <>
      <Modal
        title={props?.title}
        visible={props.isModalCreateVisible}
        confirmLoading={state?.loadingBtnCreate}
        footer={null}
        onCancel={handleCancel}
        width="600px"
      >
        <Form
          name="basic"
          onFinish={onFinish}
          layout="vertical"
          form={form}
          autoComplete="off"
          style={{ display: ' flex', width: '100%' }}
        >
          <Row style={{ width: '100%' }}>
            <Col span={24}>
              <div
                style={{
                  boxShadow: 'rgb(0 0 0 / 15%) 0px 1px 4px',
                  padding: '20px 30px',
                  borderRadius: 5,
                  marginBottom: 20,
                }}
              >
                {/* new row */}
                <Row style={{ display: 'flex', justifyContent: 'center' }}>
                  <Col
                    xs={16}
                    xl={12}
                    style={{ width: ' 100%', paddingRight: 10 }}
                  >
                    <Form.Item
                      name="house"
                      label="Lựa chọn nhà"
                      className="flex"
                      style={{ display: 'flex' }}
                      rules={
                        props?.data?.id || props?.title === 'Đăng tin mới'
                          ? [
                              {
                                required: true,
                                message: 'Vui lòng chọn nhà !',
                              },
                            ]
                          : []
                      }
                    >
                      <Select
                        placeholder="Chọn nhà đăng tin"
                        style={{ width: '100%' }}
                        onChange={houseOnchange}
                        loading={stateListHouse?.loading}
                        disabled={props?.data?.id ? true : false}
                      >
                        {stateListHouse?.dataResponse?.length > 0
                          ? stateListHouse?.dataResponse?.map(
                              (item: any, key: any) => {
                                return (
                                  <Option key={key} value={item?.id}>
                                    {item?.name}
                                  </Option>
                                );
                              }
                            )
                          : ''}
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col xs={16} xl={12} style={{ width: ' 100%' }}>
                    <Form.Item
                      name="room"
                      label="Lựa chọn phòng"
                      className="flex"
                      style={{ display: 'flex' }}
                      rules={
                        props?.data?.id || props?.title === 'Đăng tin mới'
                          ? [
                              {
                                required: true,
                                message: 'Vui lòng chọn phòng !',
                              },
                            ]
                          : []
                      }
                    >
                      <Select
                        placeholder="Chọn loại phòng hiển thị"
                        style={{ width: '100%' }}
                        loading={stateListRoom?.loading}
                        disabled={props?.data?.id ? true : false}
                        onSelect={(values: any) => {
                          let itemSelectd: any = {};
                          stateListRoom?.dataResponse?.results?.map(
                            (item: any) => {
                              if (values === item?.id) {
                                itemSelectd = item;
                              }
                            }
                          );
                          if (itemSelectd?.status === false) {
                            message.error(
                              'Bạn cần chọn phòng với trạng thái còn phòng!'
                            );
                            form.setFieldsValue({
                              room: '',
                            });
                          } else {
                            message.success('Đã chọn phòng');
                          }
                        }}
                      >
                        {stateListRoom?.dataResponse?.results?.length > 0
                          ? stateListRoom?.dataResponse?.results?.map(
                              (item: any, key: any) => {
                                return (
                                  <Option key={key} value={item?.id}>
                                    {item?.name} -{' '}
                                    {item?.status === true ? (
                                      <span
                                        className="color-success"
                                        style={{ fontSize: 13 }}
                                      >
                                        Còn phòng
                                      </span>
                                    ) : (
                                      <span
                                        className="color-error"
                                        style={{ fontSize: 13 }}
                                      >
                                        Hết phòng
                                      </span>
                                    )}
                                  </Option>
                                );
                              }
                            )
                          : ''}
                      </Select>
                    </Form.Item>
                  </Col>
                </Row>

                <Form.Item
                  name="postType"
                  label="Loại tin đăng"
                  rules={[
                    {
                      required: true,
                      message: 'Vui lòng chọn loại tin đăng !',
                    },
                  ]}
                >
                  <Select
                    showSearch
                    style={{ width: '100%' }}
                    placeholder="Loại tin đăng"
                    disabled={props?.data?.id ? true : false}
                    // disabled={disablePostType(props?.data)}
                    onChange={(value: any) => {
                      let priceInit = 0;
                      state?.dataResponsePostType?.map((item: any) => {
                        if (item?.id === value) {
                          priceInit = item?.price;
                        }
                      });
                      setPostState({
                        ...postState,
                        pricePostType: priceInit,
                        totalPrice: postState.numberOfDays * priceInit,
                      });
                    }}
                  >
                    {state?.dataResponsePostType?.length > 0
                      ? state?.dataResponsePostType?.map(
                          (item: any, key: any) => {
                            return (
                              <Option key={key} value={item?.id}>
                                {item?.type}
                              </Option>
                            );
                          }
                        )
                      : ''}
                  </Select>
                </Form.Item>

                {/* new row */}
                <Row style={{ display: 'flex', justifyContent: 'center' }}>
                  <Col
                    xs={16}
                    xl={12}
                    style={{ width: ' 100%', paddingRight: 10 }}
                  >
                    <Form.Item
                      name="numberOfDays"
                      className="flex"
                      label=" Số ngày đăng"
                      style={{ display: 'flex' }}
                      rules={[
                        {
                          required: true,
                          message: 'Vui lòng chọn số ngày đăng !',
                        },
                      ]}
                    >
                      <Select
                        showSearch
                        style={{ width: '100%' }}
                        placeholder="Số ngày đăng"
                        onChange={(value: any) => {
                          setPostState({
                            ...postState,
                            numberOfDays: value,
                            totalPrice: value * postState.pricePostType,
                          });
                        }}
                      >
                        {postDate.map((item: any, key: any) => {
                          return (
                            <Option key={key} value={item?.id}>
                              {item?.title}
                            </Option>
                          );
                        })}
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col xs={16} xl={12} style={{ width: ' 100%' }}>
                    <Form.Item
                      name="startDate"
                      className="flex"
                      style={{ display: 'flex' }}
                      label="Ngày bắt đầu"
                      rules={
                        [
                          {
                            required: true,
                            message: 'Vui lòng chọn ngày bắt đầu !',
                          },
                        ]
                        // !disablePostType(props?.data)
                        //   ? [

                        //   ]
                        // : []
                      }
                    >
                      <DatePicker
                        placeholder="Ngày bắt đầu"
                        style={{ width: '100%' }}
                        disabled={props?.data?.id ? true : false}
                        // disabled={disablePostType(props?.data)}
                        disabledDate={(current) => {
                          return moment().add(-1, 'days') >= current;
                        }}
                        // onChange={onChange}
                        format="DD/MM/YYYY"
                      />
                    </Form.Item>
                  </Col>
                </Row>

                {/* new row */}
                <Row style={{ display: 'flex', justifyContent: 'center' }}>
                  <Col
                    xs={24}
                    xl={24}
                    style={{
                      width: ' 100%',
                      paddingRight: 10,
                      backgroundColor: '#edf7fe',
                    }}
                  >
                    <div
                      style={{
                        width: '100%',
                        padding: '10px 20px',
                        marginTop: 10,
                        borderRadius: '2px',
                      }}
                    >
                      <Row style={{ width: ' 100%' }}>
                        <Col xs={24} xl={16}>
                          Đơn giá / ngày
                        </Col>
                        <Col xs={24} xl={8}>
                          {postState?.pricePostType !== 0
                            ? convertPrice(postState?.pricePostType) + ' VND'
                            : ''}{' '}
                        </Col>
                      </Row>
                      <Row style={{ width: ' 100%' }} className="mt-10">
                        <Col xs={24} xl={16}>
                          Số ngày đăng tin
                        </Col>
                        <Col xs={24} xl={8}>
                          {postState?.numberOfDays !== 0
                            ? postState?.numberOfDays + ' ngày'
                            : ''}{' '}
                        </Col>
                      </Row>
                      <Row style={{ width: ' 100%' }} className="mt-10">
                        <Col xs={24} xl={16}>
                          Phí đăng tin
                        </Col>
                        <Col xs={24} xl={8}>
                          <p
                            style={{
                              color: 'rgb(150, 27, 18)',
                              fontWeight: ' bold',
                              fontSize: 15,
                            }}
                          >
                            {postState?.totalPrice !== 0
                              ? convertPrice(postState?.totalPrice) + ' VND'
                              : ''}
                          </p>
                        </Col>
                      </Row>
                    </div>
                  </Col>
                </Row>

                <div className="color-error mt-10">{state?.msgTotal}</div>

                <div className="mt-50 flex justify-between">
                  <p className="mt-10" />
                  <Button
                    style={{
                      backgroundColor: '#13c2c2',
                      borderColor: '#13c2c2',
                      color: 'white',
                    }}
                    loading={state?.btnLoadingCreate}
                    htmlType="submit"
                  >
                    {props?.title}
                  </Button>
                </div>
              </div>
            </Col>
          </Row>
        </Form>
      </Modal>
    </>
  );
};

export default PostCreate;
