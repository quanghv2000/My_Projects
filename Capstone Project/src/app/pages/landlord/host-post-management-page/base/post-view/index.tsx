import {
  Button,
  Col,
  Descriptions,
  Form,
  Image,
  Modal,
  Row,
  message,
} from 'antd';
import {
  checkStatus,
  formatCostPost,
  statusVerify,
} from 'app/pages/admin/admin-post-management-page/base/post-view/template';
import 'app/pages/landlord/host-house-detail-page/base/house-detail-info-tab/style.scss';
import { convertPrice } from 'helper/convert-price-to-vnd';
import { DetailRoomContent } from 'app/pages/admin/admin-post-management-page/base/detail-room-content-modal';
import { ImageGallerys } from 'app/pages/user/detail-room-page/base/image-gallery/index';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'types/RootState';
import { useEffect, useState } from 'react';
import {
  deletePostRequest,
  clearHostPostCreate,
  getListPostRequest,
} from 'app/pages/landlord/host-post-management-page/screen/action';

const PostView = (props) => {
  const dispatch = useDispatch();
  const statePostingCostPageReducer = useSelector(
    (state: RootState) => state?.adminPostingCostPageReducer
  );

  const [stateComp, setStateComp] = useState({
    titleModal: '',
    labelTextArea: '',
    status: '',
    modalVisible: false,
    confirmVisible: false,
  });

  const [form] = Form.useForm();

  const [roomSDetailVisible, setRoomSDetailVisible] = useState(false);

  const state = useSelector((state: RootState) => state?.hostPostPageReducer);

  useEffect(() => {
    if (state?.msgDelete === 'deleted' && props?.isModalViewVisible) {
      dispatch(clearHostPostCreate(''));
      message.success('Đã xoá bài thành công');
      dispatch(getListPostRequest(''));
      setStateComp({
        ...stateComp,
        modalVisible: false,
      });
      props.setIsModalViewVisible(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state?.msgDelete]);

  // function check status button
  const checkStatusForButton = () => {
    return (
      <Button
        className="mb-10"
        danger
        type="primary"
        style={{ marginLeft: '10px' }}
        onClick={() => {
          setStateComp({
            titleModal: 'Xoá bài đăng tin',
            labelTextArea: 'Lý do gỡ',
            status: 'delete',
            modalVisible: true,
            confirmVisible: false,
          });
        }}
      >
        Xoá bài đăng
      </Button>
    );
  };

  const postingCosts =
    statePostingCostPageReducer?.dataResponse?.length > 0
      ? statePostingCostPageReducer?.dataResponse
      : [];
  return (
    <>
      <Modal
        title={` ${props?.data?.houseName} - ${props?.data?.postType}`}
        visible={props.isModalViewVisible}
        okButtonProps={{ style: { display: 'none' } }}
        cancelText="Đóng"
        onCancel={() => props.setIsModalViewVisible(false)}
        width="1000px"
        style={{ top: 10 }}
        footer={[checkStatusForButton()]}
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

              <Descriptions.Item label="Diện tích phòng">
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
                <Descriptions.Item label="Ghi chú bài đăng" span={3}>
                  {props?.data?.note}
                </Descriptions.Item>
              ) : (
                ''
              )}

              {props?.data?.verifyNote ? (
                <Descriptions.Item label="Ghi chú xác thực" span={3}>
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

      <Modal
        title={stateComp?.titleModal}
        style={{ top: 20 }}
        width="400px"
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
        <Row style={{ display: 'flex', justifyContent: 'center' }}>
          <p>
            Bài viết bị xoá sẽ không thể lấy lại (những bài đăng đang được đăng tin
            sẽ không được hiện thị nữa)
          </p>

          <div
            style={{
              display: 'flex',
              justifyContent: 'flex-end',
              marginTop: 30,
            }}
          >
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
              loading={state?.btnDeleteLoading}
              onClick={() => {
                const body = {
                  id: props?.data?.id,
                };
                dispatch(deletePostRequest(body));
              }}
              type="primary"
            >
              Xác nhận
            </Button>
          </div>
        </Row>
      </Modal>
    </>
  );
};

export default PostView;
