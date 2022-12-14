import {
  Button,
  Col,
  Descriptions,
  Modal,
  Row,
  Badge,
  Image,
  Form,
} from 'antd';
import {
  checkStatus,
  success,
  formatCostPost,
  statusVerify,
} from 'app/pages/admin/admin-post-management-page/base/post-view/template';
import {
  cancelVerifyPostRequest,
  clearState,
  getListPostRequest,
  verifyPostRequest,
} from 'app/pages/admin/admin-post-management-page/screen/action';
import 'app/pages/landlord/host-house-detail-page/base/house-detail-info-tab/style.scss';
import { getPostTypeRequest } from 'app/pages/landlord/host-post-management-page/screen/action';
import { convertPrice } from 'helper/convert-price-to-vnd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import moment from 'moment';
import { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'types/RootState';
import TextArea from 'antd/lib/input/TextArea';
import { DetailRoomContent } from 'app/pages/admin/admin-post-management-page/base/detail-room-content-modal';
import { ImageGallerys } from 'app/pages/user/detail-room-page/base/image-gallery/index';

const PostViewVerify = (props) => {
  const dispatch = useDispatch();
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

  const [modalConfirmVisible, setModalConfirmVisible] = useState(false);
  const [verifyType, setVerifyType] = useState('');
  const [postID, setPostId] = useState('');
  const [roomSDetailVisible, setRoomSDetailVisible] = useState(false);
  const [form] = Form.useForm();

  const [stateComp, setStateComp] = useState({
    titleModal: '',
    labelTextArea: '',
    status: '',
    modalVisible: false,
    confirmVisible: false,
  });

  const actionVerify = (data: any) => {

    if (data?.verify === 'VERIFIED') {
      return (
        <Button
          className="mb-10"
          type="primary"
          style={{
            marginLeft: '10px',
            backgroundColor: '#e1a225',
            borderColor: '#e1a225',
          }}
          onClick={() => {
            setVerifyType('REJECTED');
            setPostId(data?.id);
            setModalConfirmVisible(true);
          }}
        >
          Y??u c???u x??c th???c l???i
        </Button>
      );
    }

    if (data?.verify === 'VERIFIED_AGAIN') {
      return (
        <>
          <Button
            className="mb-10"
            type="primary"
            style={{
              marginLeft: '10px',
              backgroundColor: '#e1a225',
              borderColor: '#e1a225',
            }}
            onClick={() => {
              setVerifyType('REJECTED');
              setPostId(data?.id);
              setModalConfirmVisible(true);
            }}
            loading={state?.buttonLoadingCancelVerify}
          >
            {' '}
            Y??u c???u x??c th???c l???i
          </Button>
          <Button
            className="mb-10"
            type="primary"
            style={{
              marginLeft: '10px',
              backgroundColor: '#389e0d',
              borderColor: '#389e0d',
            }}
            onClick={() => {
              setVerifyType('VERIFY_AGAIN');
              setPostId(data?.id);
              setModalConfirmVisible(true);
            }}
            loading={state?.buttonLoadingVerify}
          >
            X??c th???c l???i b??i ????ng
          </Button>
        </>
      );
    }

    if (data?.verify === 'WAITING') {
      return (
        <>
          <Button
            className="mb-10"
            type="primary"
            style={{
              marginLeft: '10px',
              backgroundColor: '#e1a225',
              borderColor: '#e1a225',
            }}
            onClick={() => {
              setVerifyType('REJECTED');
              setPostId(data?.id);
              setModalConfirmVisible(true);
            }}
            loading={state?.buttonLoadingCancelVerify}
          >
            {' '}
            Y??u c???u x??c th???c l???i
          </Button>

          <Button
            className="mb-10"
            type="primary"
            style={{
              marginLeft: '10px',
              backgroundColor: '#389e0d',
              borderColor: '#389e0d',
            }}
            onClick={() => {
              setStateComp({
                ...stateComp,
                confirmVisible: true,
              });
              Modal.confirm({
                title: 'X??c th???c b??i ????ng',
                icon: <ExclamationCircleOutlined />,
                visible: stateComp?.confirmVisible,
                content: ' ',
                okText: 'X??c nh???n',
                cancelText: 'Hu???',
                onOk: () => {
                  dispatch(
                    verifyPostRequest({
                      id: data?.id,
                    })
                  );
                  setStateComp({
                    ...stateComp,
                    confirmVisible: false,
                  });
                },
              });
            }}
            loading={state?.buttonLoadingVerify}
          >
            X??c th???c b??i ????ng
          </Button>
        </>
      );
    }
  };

  const showMsg = (status: string) => {
    if (status === 'verified') {
      success('???? x??c th???c');
    }
    if (status === 'cancel-verified') {
      success('???? y??u c???u x??c th???c b??i vi???t');
    }
  };

  const onFinish = (values: any) => {
    if (verifyType === 'REJECTED') {
      dispatch(
        cancelVerifyPostRequest({
          id: postID,
          verifyNote: values?.note,
        })
      );
    }

    if (verifyType === 'VERIFY_AGAIN') {
      dispatch(
        dispatch(
          verifyPostRequest({
            id: postID,
            verifyNote: values?.note,
          })
        )
      );
    }
    setStateComp({
      ...stateComp,
      confirmVisible: false,
    });
    setModalConfirmVisible(false);
  };

  useEffect(() => {
    if (state.status !== '' && props?.isModalViewVisible) {
      dispatch(clearState(''));
      showMsg(state.status);
      dispatch(getListPostRequest(''));
      dispatch(getPostTypeRequest(''));
      setModalConfirmVisible(false);
      setStateComp({
        ...stateComp,
        modalVisible: false,
      });
      props.setIsModalViewVisible(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state?.status]);
  return (
    <>
      <Modal
        title={` ${props?.data?.houseName} -  ${props?.data?.postType}`}
        visible={props.isModalViewVisible}
        onCancel={() => props.setIsModalViewVisible(false)}
        footer={[actionVerify(props?.data)]}
        width="1000px"
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
            <Descriptions title="Th??ng Tin v??? b??i ????ng" bordered>
              <Descriptions.Item label="T??n nh??">
                {props?.data?.houseName ? props?.data?.houseName : ''}
              </Descriptions.Item>
              <Descriptions.Item label="Lo???i h??nh cho thu??" span={2}>
                {props?.data?.roomCategory ? props?.data?.roomCategory : ''}
              </Descriptions.Item>
              <Descriptions.Item label="?????a ch???">
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
              <Descriptions.Item label="Gi?? thu?? ph??ng" span={2}>
                <span style={{ fontWeight: 'bold' }}>
                  {props?.data?.rentalPrice
                    ? `${convertPrice(props?.data?.rentalPrice)}???`
                    : ''}
                </span>
              </Descriptions.Item>
              <Descriptions.Item label="Tr???ng th??i" span={3}>
                {checkStatus(props?.data)}{' '}
                <span>{statusVerify(props?.data?.verify)}</span>
              </Descriptions.Item>

              <Descriptions.Item label="M?? b??i ????ng">
                {props?.data?.postCode ? props?.data?.postCode : ''}
              </Descriptions.Item>

              <Descriptions.Item label="Lo???i tin" span={3}>
                {props?.data?.postTypeId
                  ? formatCostPost(props?.data?.postTypeId, postingCosts)
                  : ''}
              </Descriptions.Item>

              <Descriptions.Item label="Di???n t??ch ph??ng">
                {' '}
                {props?.data?.area ? `${props?.data?.area}m??` : ''}
              </Descriptions.Item>
              <Descriptions.Item label="S??? ng??y ????ng" span={2}>
                {props?.data?.numberOfDays
                  ? `${props?.data?.numberOfDays} ng??y`
                  : ''}
              </Descriptions.Item>

              <Descriptions.Item label="Ng??y ????ng tin">
                {props?.data?.startDate
                  ? moment(props?.data?.startDate).format('DD/MM/YYYY')
                  : ''}
              </Descriptions.Item>

              <Descriptions.Item label="Ng??y h???t h???n" span={2}>
                {props?.data?.endDate
                  ? moment(props?.data?.endDate).format('DD/MM/YYYY')
                  : ''}
              </Descriptions.Item>

              <Descriptions.Item label="T??n ch??? nh??">
                {props?.data?.hostName ? props?.data?.hostName : ''}
              </Descriptions.Item>

              <Descriptions.Item label="T???ng ph?? ????ng" span={2}>
                <span style={{ fontWeight: 'bold' }}>
                  {props?.data?.cost
                    ? `${convertPrice(props?.data?.cost)}???`
                    : ''}
                </span>
              </Descriptions.Item>

              <Descriptions.Item label="S??? ??i???n tho???i">
                {props?.data?.hostPhone ? props?.data?.hostPhone : ''}
              </Descriptions.Item>

              <Descriptions.Item label="T??n t??i kho???n" span={2}>
                {props?.data?.username ? props?.data?.username : ''}
              </Descriptions.Item>

              <Descriptions.Item label="???nh ph??ng" span={3}>
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
                  Xem chi ti???t ph??ng
                </Button>
              </Descriptions.Item>
              {props?.data?.note ? (
                <Descriptions.Item label="Ghi ch??" span={3}>
                  {props?.data?.note}
                </Descriptions.Item>
              ) : (
                ''
              )}

              {props?.data?.verifyNote ? (
                <Descriptions.Item label="Ghi ch?? x??c th???c" span={3}>
                  {props?.data?.verifyNote}
                </Descriptions.Item>
              ) : (
                ''
              )}
            </Descriptions>
          </Col>
        </div>
      </Modal>

      <Modal
        title={
          verifyType === 'REJECTED' ? 'Hu??? x??c th???c' : 'X??c th???c l???i b??i ????ng'
        }
        style={{ top: 20 }}
        width="720px"
        visible={modalConfirmVisible}
        onCancel={() => {
          form.resetFields();
          setModalConfirmVisible(false);
        }}
        footer={null}
      >
        <Row style={{ display: 'flex', justifyContent: ' center' }}>
          <Col xs={24} xl={16}>
            <Form
              layout="vertical"
              name="modal"
              onFinish={onFinish}
              form={form}
            >
              <Fragment>
                <Form.Item
                  label={verifyType === 'REJECTED' ? 'L?? do ' : 'Ghi ch??'}
                  name="note"
                  rules={[
                    {
                      required: true,
                      message:
                        verifyType === 'REJECTED'
                          ? 'Nh???p th??ng l?? do !'
                          : 'Nh???p ghi ch??',
                    },
                  ]}
                >
                  <TextArea
                    rows={4}
                    placeholder={
                      verifyType === 'REJECTED' ? 'Nh???p l?? do ' : 'Nh???p ghi ch??'
                    }
                    maxLength={1000}
                  />
                </Form.Item>
                <div style={{ color: 'gray', fontSize: 13 }}>
                  {verifyType === 'REJECTED'
                    ? '(S??? c?? mail th??ng b??o n???i dung y??u c???u x??c th???c l???i v??? cho ng?????i d??ng!)'
                    : ''}
                </div>
              </Fragment>
              <div
                style={{
                  display: ' flex',
                  justifyContent: 'flex-end',
                  marginTop: 10,
                }}
              >
                <Button
                  className="mb-10"
                  style={{ marginRight: '10px' }}
                  onClick={() => {
                    form.resetFields();
                    setModalConfirmVisible(false);
                  }}
                >
                  ????ng
                </Button>
                <Button
                  type="primary"
                  loading={state?.buttonLoadingCancelVerify}
                  htmlType="submit"
                >
                  X??c nh???n
                </Button>
              </div>
            </Form>
          </Col>
        </Row>
      </Modal>

      <Modal
        title={'Chi ti???t c??c ph??ng'}
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

export default PostViewVerify;
