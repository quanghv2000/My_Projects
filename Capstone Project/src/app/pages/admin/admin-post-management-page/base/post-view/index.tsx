import {
  Button,
  Col,
  Descriptions,
  Modal,
  Row,
  Form,
  Input,
  Image,
} from 'antd';
import { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'types/RootState';
import 'app/pages/landlord/host-house-detail-page/base/house-detail-info-tab/style.scss';
import { convertPrice } from 'helper/convert-price-to-vnd';
import {
  confirmPostRequest,
  rejectPostRequest,
  deletePostRequest,
  getListPostRequest,
  restorePostRequest,
  clearState,
} from 'app/pages/admin/admin-post-management-page/screen/action';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import {
  checkStatus,
  success,
  formatCostPost,
  statusVerify,
} from 'app/pages/admin/admin-post-management-page/base/post-view/template';
import { getPostTypeRequest } from 'app/pages/landlord/host-post-management-page/screen/action';
import { DetailRoomContent } from 'app/pages/admin/admin-post-management-page/base/detail-room-content-modal';
import { ImageGallerys } from 'app/pages/user/detail-room-page/base/image-gallery/index';
import moment from 'moment';

// import { Link } from 'react-router-dom';
const { TextArea } = Input;

const PostView = (props) => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const state = useSelector(
    (state: RootState) => state?.adminPostManagmentReducer
  );

  const statePostingCostPageReducer = useSelector(
    (state: RootState) => state?.adminPostingCostPageReducer
  );

  const postingCosts =
    statePostingCostPageReducer?.dataResponse?.length > 0
      ? statePostingCostPageReducer?.dataResponse
      : [];

  const [stateComp, setStateComp] = useState({
    titleModal: '',
    labelTextArea: '',
    status: '',
    modalVisible: false,
    confirmVisible: false,
  });

  const [roomSDetailVisible, setRoomSDetailVisible] = useState(false);

  // function check status button
  const checkStatusForButton = (data: any) => {
    // status = 0 - Đang hiển thị
    if (
      data?.status === 'CENSORED' &&
      moment(data?.endDate) > moment() &&
      moment(data?.startDate) < moment()
    ) {
      return (
        <>
          <Button
            className="mb-10"
            danger
            type="primary"
            style={{ marginLeft: '10px' }}
            onClick={() => {
              setStateComp({
                titleModal: 'Gỡ gỡ bài đăng tin',
                labelTextArea: 'Lý do gỡ',
                status: 'delete',
                modalVisible: true,
                confirmVisible: false,
              });
            }}
          >
            Gỡ bài đăng
          </Button>
        </>
      );
    }
    // status = 1 - Đã hết hạn
    if (moment(data?.endDate) <= moment() && data?.status === 'CENSORED') {
      return ``;
    }
    // status = 2 - Chờ hiển thị
    if (data?.status === 'CENSORED' && moment(data?.startDate) > moment()) {
      return (
        <>
          <Button
            className="mb-10"
            danger
            type="primary"
            style={{ marginLeft: '10px' }}
            onClick={() => {
              setStateComp({
                titleModal: 'Gỡ huỷ bài đăng tin',
                labelTextArea: 'Lý do huỷ',
                status: 'reject',
                modalVisible: true,
                confirmVisible: false,
              });
            }}
          >
            Huỷ bỏ đăng tin
          </Button>
        </>
      );
    }
    // status = 3 - Chờ kiểm duyệt
    if (data?.status === 'UNCENSORED') {
      return (
        <Fragment>
          <Button
            className="mb-10"
            danger
            type="primary"
            style={{ marginLeft: '10px' }}
            onClick={() => {
              setStateComp({
                titleModal: 'Huỷ đăng tin',
                labelTextArea: 'Lý do huỷ tin',
                status: 'reject',
                modalVisible: true,
                confirmVisible: false,
              });
            }}
          >
            Từ chối
          </Button>
          <Button
            type="primary"
            loading={state?.buttonLoading}
            onClick={() => {
              setStateComp({
                ...stateComp,
                confirmVisible: true,
              });
              Modal.confirm({
                title: 'Xác nhận duyệt bài đăng',
                icon: <ExclamationCircleOutlined />,
                visible: stateComp?.confirmVisible,
                content: ' ',
                okText: 'Xác nhận',
                cancelText: 'Huỷ',
                onOk: () => {
                  dispatch(confirmPostRequest(props?.data?.id));
                  setStateComp({
                    ...stateComp,
                    confirmVisible: false,
                  });
                },
              });
            }}
          >
            Duyệt bài đăng
          </Button>
        </Fragment>
      );
    }
    // status = 4 - Đã bị huỷ
    if (data?.status === 'DELETED') {
      return (
        <Button
          type="primary"
          loading={state?.buttonLoading}
          onClick={() => {
            setStateComp({
              titleModal: 'Khôi phục bài đăng tin',
              labelTextArea: 'Ghi chú',
              status: 'restore',
              modalVisible: true,
              confirmVisible: false,
            });
          }}
        >
          Khôi phục bài đăng
        </Button>
      );
    }
  };

  const showMsg = (status: string) => {
    if (status === 'rejected') {
      success('Đã huỷ bài thành công');
    }
    if (status === 'confirmed') {
      success('Duyệt bài thành công');
    }
    if (status === 'deleteted') {
      success('Đã gỡ bài thành công');
    }
  };

  useEffect(() => {
    if (state?.status !== '' && props?.isModalViewVisible) {
      dispatch(clearState(''));
      showMsg(state.status);
      dispatch(getListPostRequest(''));
      dispatch(getPostTypeRequest(''));
      setStateComp({
        ...stateComp,
        modalVisible: false,
      });
      props.setIsModalViewVisible(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state?.status]);

  const onFinish = (value: any) => {
    const body: any = {
      id: props?.data?.id,
      note: value?.note,
    };
    if (stateComp?.status === 'reject') {
      dispatch(rejectPostRequest(body));
    }
    if (stateComp?.status === 'delete') {
      dispatch(deletePostRequest(body));
    }
    if (stateComp?.status === 'restore') {
      dispatch(restorePostRequest(body));
    }
  };

  return (
    <>
      <Modal
        title={` ${props?.data?.houseName} -  ${props?.data?.postType}`}
        visible={props.isModalViewVisible}
        // onOk={handleOk}
        onCancel={() => props.setIsModalViewVisible(false)}
        footer={[checkStatusForButton(props?.data)]}
        width="1050px"
        style={{ top: 10 }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            width: '100%',
            marginTop: 10,
          }}
        >
          <Col
            xs={24}
            xl={24}
            style={{
              width: '100%',
              padding: '20px 30px',
              boxShadow: 'rgb(0 0 0 / 15%) 0px 1px 4px',
              borderRadius: 5,
            }}
          >
            <Descriptions title="Thông Tin về bài đăng" bordered>
              <Descriptions.Item label="Tên nhà">
                {props?.data?.houseName ? props?.data?.houseName : ''}
              </Descriptions.Item>
              <Descriptions.Item label="Loại hình cho thuê" span={2}>
                {props?.data?.roomCategory ? props?.data?.roomCategory : ''}
              </Descriptions.Item>
              <Descriptions.Item label="Địa chỉ">
                {props?.data?.street ? (
                  <div>
                    <div>{`${props?.data?.street}, ${props?.data?.phuongXa},`}</div>{' '}
                    <div>
                      {`${props?.data?.quanHuyen}, ${props?.data?.thanhPho} `}
                    </div>
                  </div>
                ) : (
                  ''
                )}
              </Descriptions.Item>
              <Descriptions.Item label="Giá thuê phòng" span={2}>
                <span style={{ fontWeight: 'bold' }}>
                  {props?.data?.rentalPrice
                    ? `${convertPrice(props?.data?.rentalPrice)}₫`
                    : ''}
                </span>
              </Descriptions.Item>
              <Descriptions.Item label="Trạng thái" span={3}>
                {checkStatus(props?.data)}{' '}
                <span>{statusVerify(props?.data?.verify)}</span>
              </Descriptions.Item>

              <Descriptions.Item label="Mã bài đăng">
                {props?.data?.postCode ? props?.data?.postCode : ''}
              </Descriptions.Item>

              <Descriptions.Item label="Loại tin" span={3}>
                {props?.data?.postTypeId
                  ? formatCostPost(props?.data?.postTypeId, postingCosts)
                  : ''}
              </Descriptions.Item>

              <Descriptions.Item label="Diện tích nhà">
                {' '}
                {props?.data?.area ? `${props?.data?.area}m²` : ''}
              </Descriptions.Item>
              <Descriptions.Item label="Số ngày đăng" span={2}>
                {props?.data?.numberOfDays
                  ? `${props?.data?.numberOfDays} ngày`
                  : ''}
              </Descriptions.Item>

              <Descriptions.Item label="Ngày đăng tin">
                {props?.data?.startDate
                  ? moment(props?.data?.startDate).format('DD/MM/YYYY')
                  : ''}
              </Descriptions.Item>

              <Descriptions.Item label="Ngày hết hạn" span={2}>
                {props?.data?.endDate
                  ? moment(props?.data?.endDate).format('DD/MM/YYYY')
                  : ''}
              </Descriptions.Item>

              <Descriptions.Item label="Tên chủ nhà">
                {props?.data?.hostName ? props?.data?.hostName : ''}
              </Descriptions.Item>

              <Descriptions.Item label="Tổng phí đăng" span={2}>
                <span style={{ fontWeight: 'bold' }}>
                  {props?.data?.cost
                    ? `${convertPrice(props?.data?.cost)}₫`
                    : ''}
                </span>
              </Descriptions.Item>

              <Descriptions.Item label="Số điện thoại">
                {props?.data?.hostPhone ? props?.data?.hostPhone : ''}
              </Descriptions.Item>

              <Descriptions.Item label="Tên tài khoản" span={2}>
                {props?.data?.username ? props?.data?.username : ''}
              </Descriptions.Item>

              <Descriptions.Item label="Ảnh phòng" span={3}>
                <Row>
                  {props?.data?.images?.length > 0
                    ? props?.data?.images?.map((item: any, key: any) => {
                        return (
                          <Col xs={24} xl={6} key={key} style={{ padding: 10 }}>
                            <Image src={item?.imageUrl} height={50} />
                          </Col>
                        );
                      })
                    : ''}
                </Row>
                <Button type="link" onClick={() => setRoomSDetailVisible(true)}>
                  Xem chi tiết phòng
                </Button>
              </Descriptions.Item>
              {props?.data?.note ? (
                <Descriptions.Item label="Ghi chú" span={3}>
                  {props?.data?.note}
                </Descriptions.Item>
              ) : (
                ''
              )}
            </Descriptions>
            <div className="mt-10 color-error">
              {props?.data?.status === 'UNCENSORED' &&
              moment(props?.data.endDate) <= moment()
                ? 'Bài đăng này đã quá hạn mà người dùng muốn đăng !'
                : ''}
            </div>
          </Col>
        </div>
      </Modal>

      <Modal
        title={stateComp?.titleModal}
        style={{ top: 20 }}
        width="700px"
        visible={stateComp?.modalVisible}
        onCancel={() => {
          form.resetFields();
          setStateComp({
            ...stateComp,
            modalVisible: false,
          });
        }}
        footer={null}
      >
        <Row style={{ display: 'flex', justifyContent: ' center' }}>
          <Col xs={24} xl={16}>
            <Form layout="vertical" onFinish={onFinish} form={form}>
              <Fragment>
                <Form.Item
                  label={stateComp?.labelTextArea}
                  name="note"
                  rules={[
                    {
                      required: true,
                      message:
                        stateComp?.status === 'restore'
                          ? 'Vui lòng nhập ghi chú'
                          : 'Vui lòng nhập lý do!',
                    },
                  ]}
                >
                  <TextArea
                    rows={4}
                    placeholder={
                      stateComp?.status === 'restore'
                        ? 'Nhập ghi chú'
                        : 'Nhập lý do'
                    }
                    maxLength={1000}
                  />
                </Form.Item>
              </Fragment>

              <div style={{ display: ' flex', justifyContent: 'flex-end' }}>
                <Button
                  className="mb-10"
                  style={{ marginRight: '10px' }}
                  onClick={() => {
                    form.resetFields();
                    setStateComp({
                      ...stateComp,
                      modalVisible: false,
                    });
                  }}
                >
                  Đóng
                </Button>
                <Button
                  type="primary"
                  loading={state?.buttonLoading}
                  htmlType="submit"
                >
                  Xác nhận
                </Button>
              </div>
            </Form>
          </Col>
        </Row>
      </Modal>

      <Modal
        title={'Chi tiết các phòng'}
        style={{ top: 20 }}
        width={'80%'}
        visible={roomSDetailVisible}
        onCancel={() => {
          setRoomSDetailVisible(false);
        }}
        footer={null}
      >
        <div style={{ padding: '10px 40px' }}>
          <ImageGallerys />
          <DetailRoomContent
            data={{
              id: props?.data?.id,
              idRoom: props?.data?.roomId,
            }}
          />
        </div>
      </Modal>
    </>
  );
};

export default PostView;
