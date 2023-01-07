import { PlusOutlined } from '@ant-design/icons';
import {
  Button,
  Checkbox,
  Col,
  Form,
  Input,
  InputNumber,
  Row,
  Select,
  Modal,
  Upload,
  Spin,
  message,
} from 'antd';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import 'app/pages/landlord/room-create-page/base/room-form-create/style.scss';
import { convertPrice } from 'helper/convert-price-to-vnd';
import { vietnameseStringToUnicode } from 'helper/search-vietnamese-words';
import React, { Fragment, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getBase64, getFile } from 'helper/handle-upload';
import { useHistory } from 'react-router-dom';
import { RootState } from 'types/RootState';
// import { hostRoomCreateRequest } from 'app/pages/landlord/room-create-page/screen/action';
import { DEFAULT_APP_SECOND_UPLOAD_CLOUNDINARY } from 'utils/config';
import {
  hostRoomDetailGetRequest,
  hostRoomDetailUpdateRequest,
  setLoadingBtnUpdate,
  clearState,
} from 'app/pages/landlord/host-room-detail-page/screen/action';
import { getDataRoomCategoriesRequest } from 'app/pages/admin/admin-room-category-management-page/screen/action';
import { getDataAmenityRequest } from 'app/pages/admin/admin-amenity-management-page/screen/action';
import { getDataRoomTypeRequest } from 'app/pages/admin/admin-room-type-management-page/screen/action';

ClassicEditor.defaultConfig = {
  toolbar: {
    items: [
      'heading',
      '|',
      'bold',
      'italic',
      '|',
      'bulletedList',
      'numberedList',
      '|',
      'undo',
      'redo',
    ],
  },
  language: 'vn',
};

ClassicEditor.defaultLanguage = 'vn';

const { Option } = Select;

export const RoomFormDetail: React.FC<any> = (props: any) => {
  // history react dom to change link
  const history = useHistory();
  const dispatch = useDispatch();
  // const [form] = Form.useForm();
  // const userInfoCookies = localStorage.getItem('user-info');
  // // const userInfoCookies = getCookie('user-info');
  // let userInfo: any;

  // if (userInfoCookies) {
  //   userInfo = JSON.parse(userInfoCookies);
  // }
  const [timeRent, setTimeRent] = useState('Tháng');

  const success = () => {
    message.success({
      content: 'Chỉnh sửa thành công',
      className: 'custom-class',
    });
  };

  // declare state get from store

  const stateHouseList = useSelector(
    (state: RootState) => state?.houseListPageReducer
  );

  const stateAdminAmenity = useSelector(
    (state: RootState) => state?.adminAmenityPageReducer
  );

  const stateCategoryRoom = useSelector(
    (state: RootState) => state?.adminRoomCategoryPageReducer
  );

  const stateRoomType = useSelector(
    (state: RootState) => state?.adminRoomTypePageReducer
  );

  // const state = useSelector(
  //   (state: RootState) => state?.hostRoomCreatePageReducer
  // );

  const stateRoomDetail = useSelector(
    (state: RootState) => state?.hostRoomDetailReducer
  );

  // declare use state
  const [amenityOptions, setAmenityOptions]: any = useState([]);
  const [searchTerm, setSearchTerm] = useState();
  const [searchResult, setSearchResult] = useState();
  const [fileList, setFileList]: any = useState([]);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewTitle, setPreviewTitle] = useState('');
  const [previewImage, setPreviewImage]: any = useState('');
  const [descriptionState, setDescriptionState]: any = useState([]);
  const [valueAmenitiesCheckbox, setValueAmenitiesCheckbox]: any = useState([]);
  // end state

  //useEffect

  useEffect(() => {
    if (props?.id) {
      dispatch(hostRoomDetailGetRequest(props?.id));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, props?.id]);

  useEffect(() => {
    dispatch(getDataAmenityRequest(''));
    dispatch(getDataRoomCategoriesRequest(''));
    dispatch(getDataRoomTypeRequest(''));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  useEffect(() => {
    if (stateAdminAmenity?.dataResponse) {
      const amenity =
        stateAdminAmenity?.dataResponse?.length > 0
          ? stateAdminAmenity?.dataResponse
          : [];

      let newAmenityArray: any = [];

      // eslint-disable-next-line array-callback-return
      amenity?.map((item) => {
        if (item.type === 'room') {
          newAmenityArray.push({
            label: item?.name,
            value: item?.id,
          });
        }
      });
      setAmenityOptions(newAmenityArray);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stateAdminAmenity?.dataResponse]);

  const convertGender = (gen: any) => {
    if (gen === 'MF') {
      return 'Nam & Nữ';
    }
    if (gen === 'M') {
      return 'Nam ';
    }
    if (gen === 'F') {
      return ' Nữ';
    }
  };

  useEffect(() => {
    if (
      stateRoomDetail?.dataResponse &&
      stateRoomDetail?.dataResponse?.images?.length > 0
    ) {
      let imageList: any = [];
      let uid = 0;
      stateRoomDetail?.dataResponse?.images?.map((item: any) => {
        const image: any = {
          uid: uid++,
          name: 'Ảnh',
          url: item?.imageUrl,
          status: 'done',
        };

        imageList.push(image);
      });

      setFileList(imageList);
      let amenityArray: any = [];
      // eslint-disable-next-line array-callback-return
      stateRoomDetail?.dataResponse?.amenities?.map((item: any) => {
        amenityArray.push(item?.id);
      });
      setValueAmenitiesCheckbox(amenityArray);
      props?.form.setFieldsValue({
        name: stateRoomDetail?.dataResponse?.name,
        houseId: stateRoomDetail?.dataResponse?.house?.name,
        area: stateRoomDetail?.dataResponse?.area,
        address: stateRoomDetail?.dataResponse?.address?.street,
        roomCategoryId: stateRoomDetail?.dataResponse?.roomCategory?.name,
        roomType: stateRoomDetail?.dataResponse?.roomType?.name,
        // amenities: stateHouseDetail?.dataResponse?.amenities[0],
        // amenities: 'tv',
        status: stateRoomDetail?.dataResponse?.status,
        type: stateRoomDetail?.dataResponse?.type,
        deposit: stateRoomDetail?.dataResponse?.deposit,
        description: stateRoomDetail?.dataResponse?.description,
        maximumNumberOfPeople:
          stateRoomDetail?.dataResponse?.maximumNumberOfPeople,
        rentalPrice: stateRoomDetail?.dataResponse?.rentalPrice,
        electricityPriceByNumber:
          stateRoomDetail?.dataResponse?.electricityPriceByNumber,
        waterPricePerMonth: stateRoomDetail?.dataResponse?.waterPricePerMonth,
        roomMate: stateRoomDetail?.dataResponse?.roomMate
          ? convertGender(stateRoomDetail?.dataResponse?.roomMate)
          : 'Nam & Nữ',
        images: stateRoomDetail?.dataResponse?.images,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stateRoomDetail?.dataResponse]);

  const onChange = (checkedValues) => {
    setValueAmenitiesCheckbox(checkedValues);
  };

  useEffect(() => {
    if (stateAdminAmenity?.dataResponse) {
      const amenity =
        stateAdminAmenity?.dataResponse?.length > 0
          ? stateAdminAmenity?.dataResponse
          : [];

      let newAmenityArray: any = [];

      // eslint-disable-next-line array-callback-return
      amenity?.map((item) => {
        if (item.type === 'room') {
          newAmenityArray.push({
            label: item?.name,
            value: item?.id,
          });
        }
      });
      setAmenityOptions(newAmenityArray);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stateAdminAmenity?.dataResponse]);

  const filterCheckbox = (e: any) => {
    const searchVal = e.target.value;
    setSearchTerm(searchVal);
    const result: any = amenityOptions.filter((arrayVal: any) => {
      return vietnameseStringToUnicode(
        arrayVal?.label?.toLowerCase()
      ).startsWith(vietnameseStringToUnicode(searchVal.toLowerCase()));
    });
    setSearchResult(result);
  };

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Thêm</div>
    </div>
  );

  useEffect(() => {
    if (
      stateRoomDetail.statusUpdate === 'updated' &&
      !stateRoomDetail?.btnUpdateLoading
    ) {
      dispatch(clearState(''));
      success();
      history.push('/host/room');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stateRoomDetail?.statusUpdate]);

  const submitHandle = (values: any, dataImage: any) => {
    let dataAmenity: any = [];
    // eslint-disable-next-line array-callback-return
    valueAmenitiesCheckbox?.map((item: any) => {
      dataAmenity.push({ id: item });
    });

    const body = {
      name: values?.name,
      electricityPriceByNumber: values?.electricityPriceByNumber,
      waterPricePerMonth: values?.waterPricePerMonth,
      type: values?.type,
      area: parseFloat(values?.area),
      description: values?.description ? values?.description : descriptionState,
      roomType: {
        id:
          typeof values?.roomType !== 'string'
            ? values?.roomType
            : stateRoomDetail?.dataResponse?.roomType?.id,
      },
      house: {
        id: stateRoomDetail?.dataResponse?.house?.id,
      },
      id: stateRoomDetail?.dataResponse?.id,
      rentalPrice: values?.rentalPrice,
      maximumNumberOfPeople: parseInt(values?.maximumNumberOfPeople),
      roomCategory: {
        id:
          typeof values?.roomCategoryId !== 'string'
            ? values?.roomCategoryId
            : stateRoomDetail?.dataResponse?.roomCategory?.id,
      },
      deposit: values?.deposit,
      introImageUrl: '',
      status: values?.status,
      roomMate: values?.roomMate ? values?.roomMate : 'MF',
      amenities: dataAmenity,
      images: dataImage,
    };
    dispatch(hostRoomDetailUpdateRequest(body));
  };

  const onFinish = async (values: any) => {
    // set loading fot button update
    dispatch(setLoadingBtnUpdate(''));

    let imageUrlList: any = [];
    let imageUrlListPromises: any = [];

    const url = DEFAULT_APP_SECOND_UPLOAD_CLOUNDINARY;
    const formData = new FormData();
    if (fileList.length > 0) {
      for (let i = 0; i < fileList.length; i++) {
        let file = fileList[i];
        // check the new file upload from user and handle upload to cloud
        if (file?.originFileObj && file?.status !== 'done') {
          formData.append('file', file?.originFileObj);
          formData.append('upload_preset', 'ml_default');
          let handleUploadFile: any = new Promise((resolve, reject) => {
            try {
              resolve(
                fetch(url, {
                  method: 'POST',
                  body: formData,
                })
                  .then((response) => {
                    return response.text();
                  })
                  .then((data) => {
                    imageUrlList.push({
                      imageUrl: JSON.parse(data)?.url
                        ? JSON.parse(data)?.url
                        : '',
                    });
                  })
              );
            } catch (err) {
              reject(new Error());
            }
          });

          imageUrlListPromises.push(handleUploadFile);
        }

        // exist file when created to keep and update it (if it not remove by user)
        if (file?.status === 'done') {
          imageUrlList.push({
            imageUrl: file?.url ? file?.url : '',
          });
        }
      }
    }
    if (imageUrlListPromises?.length > 0) {
      try {
        await Promise.all(imageUrlListPromises);
      } catch (error) {
        message.error('Hệ thống xảy ra lỗi vui lòng thử lại sau!');
      }
    }

    await submitHandle(values, imageUrlList);
  };

  const onFinishFailed = (errorInfo: any) => {};

  const handleChangeUpload: any = (fileLists: any) => {
    setFileList(fileLists.fileList);
  };

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf('/') + 1)
    );
    setPreviewImage(file.url || file.preview);
    setPreviewVisible(true);
  };

  return (
    <Fragment>
      <Spin spinning={stateRoomDetail?.loading} delay={100}>
        <div
          className="mt-10"
          style={{
            display: 'flex',
            justifyContent: 'center',
            width: ' 100%',
          }}
        >
          <Form
            name="basic"
            layout="vertical"
            form={props?.form}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            style={{
              width: ' 100%',
            }}
          >
            <Row
              style={{
                width: ' 100%',
                display: 'flex',
                justifyContent: 'center',
                marginTop: 10,
              }}
            >
              <Col
                xs={24}
                xl={20}
                style={{
                  width: '100%',
                  padding: '20px 30px',
                  boxShadow: 'rgb(0 0 0 / 15%) 0px 1px 4px',
                  borderRadius: 5,
                }}
              >
                <Row style={{ display: 'flex', justifyContent: 'center' }}>
                  <Col
                    xs={24}
                    xl={12}
                    style={{ width: ' 100%', paddingRight: 10 }}
                  >
                    <Form.Item
                      name="name"
                      label="Tên phòng"
                      rules={[
                        {
                          required: true,
                          message: 'Vui lòng nhập Tên phòng !',
                        },
                      ]}
                    >
                      <Input
                        style={{ width: '100%' }}
                        placeholder="Tên phòng"
                      />
                    </Form.Item>
                  </Col>
                  <Col
                    xs={24}
                    xl={12}
                    style={{ width: ' 100%', paddingLeft: 10 }}
                  >
                    <Form.Item
                      name="area"
                      label="Diện tích"
                      rules={[
                        {
                          required: true,
                          message: 'Vui lòng nhập Diện tích !',
                        },
                      ]}
                    >
                      <Input
                        style={{ width: '100%' }}
                        placeholder="Diện tích"
                        type="number"
                        suffix="m²"
                      />
                    </Form.Item>
                  </Col>
                </Row>

                <Row style={{ display: 'flex', justifyContent: 'center' }}>
                  <Col
                    xs={24}
                    xl={12}
                    style={{ width: ' 100%', paddingRight: 10 }}
                  >
                    <Form.Item
                      name="houseId"
                      label="Nhà"
                      rules={[
                        {
                          required: true,
                          message: 'Vui lòng nhập nhà !',
                        },
                      ]}
                    >
                      <Select
                        showSearch
                        style={{ width: '100%' }}
                        placeholder="Từ nhà"
                        optionFilterProp="children"
                        disabled={true}
                        filterOption={(input, option: any) =>
                          vietnameseStringToUnicode(option.children)
                            .toLowerCase()
                            .indexOf(
                              vietnameseStringToUnicode(input.toLowerCase())
                            ) >= 0
                        }
                      >
                        {stateHouseList?.dataResponse?.length > 0
                          ? stateHouseList?.dataResponse?.map(
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
                  <Col
                    xs={24}
                    xl={12}
                    style={{ width: ' 100%', paddingLeft: 10 }}
                  >
                    <Form.Item
                      name="maximumNumberOfPeople"
                      label="Số người tối đa"
                      rules={[
                        {
                          required: true,
                          message: 'Nhập thông Số lượng người tối đa!',
                        },
                      ]}
                    >
                      <Input
                        style={{ width: '100%' }}
                        placeholder="Số lượng người tối đa"
                        type="number"
                        suffix="người"
                      />
                    </Form.Item>
                    {/* <Form.Item name="floor" label="Tầng">
                      <Select
                        showSearch
                        style={{ width: '100%' }}
                        placeholder="Từ nhà"
                        optionFilterProp="children"
                        filterOption={(input, option: any) =>
                          vietnameseStringToUnicode(option.children)
                            .toLowerCase()
                            .indexOf(
                              vietnameseStringToUnicode(input.toLowerCase())
                            ) >= 0
                        }
                      >
                        <Option value="1">Tầng 1</Option>
                        <Option value="2">Tầng 2</Option>
                        <Option value="3">Tầng 3</Option>
                      </Select>
                    </Form.Item> */}
                  </Col>
                </Row>

                {/* new row */}
                <Row style={{ display: 'flex', justifyContent: 'center' }}>
                  <Col
                    xs={24}
                    xl={12}
                    style={{ width: ' 100%', paddingRight: 10 }}
                  >
                    <Form.Item
                      name="roomCategoryId"
                      label="Danh mục phòng"
                      rules={[
                        {
                          required: true,
                          message: 'Vui lòng nhập Danh mục phòng !',
                        },
                      ]}
                    >
                      <Select
                        showSearch
                        style={{ width: '100%' }}
                        placeholder="Danh mục phòng"
                        optionFilterProp="children"
                        filterOption={(input, option: any) =>
                          vietnameseStringToUnicode(option.children)
                            .toLowerCase()
                            .indexOf(
                              vietnameseStringToUnicode(input.toLowerCase())
                            ) >= 0
                        }
                      >
                        {stateCategoryRoom?.dataResponse?.length > 0
                          ? stateCategoryRoom?.dataResponse?.map(
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
                  <Col
                    xs={24}
                    xl={12}
                    style={{ width: ' 100%', paddingLeft: 10 }}
                  >
                    <Form.Item
                      name="roomType"
                      label="Loại phòng"
                      rules={[
                        {
                          required: true,
                          message: 'Vui lòng chọn loại phòng!',
                        },
                      ]}
                    >
                      <Select
                        showSearch
                        style={{ width: '100%' }}
                        placeholder="Loại phòng"
                        optionFilterProp="children"
                        filterOption={(input, option: any) =>
                          vietnameseStringToUnicode(option.children)
                            .toLowerCase()
                            .indexOf(
                              vietnameseStringToUnicode(input.toLowerCase())
                            ) >= 0
                        }
                      >
                        {stateRoomType?.dataResponse?.length > 0
                          ? stateRoomType?.dataResponse?.map(
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
                </Row>

                {/* new row */}
                <Row style={{ display: 'flex', justifyContent: 'center' }}>
                  <Col
                    xs={24}
                    xl={12}
                    style={{ width: ' 100%', paddingRight: 10 }}
                  >
                    <Form.Item
                      name="rentalPrice"
                      label={`Đơn giá/${timeRent}`}
                      rules={[
                        {
                          required: true,
                          message: 'Vui lòng nhập Đơn giá!',
                        },
                      ]}
                    >
                      <InputNumber
                        style={{ width: '100%' }}
                        placeholder="Đơn giá"
                        // type="number"
                        formatter={(value) => convertPrice(value)}
                        addonAfter="VND"
                      />
                    </Form.Item>
                  </Col>
                  <Col
                    xs={24}
                    xl={12}
                    style={{ width: ' 100%', paddingLeft: 10 }}
                  >
                    <Form.Item
                      name="type"
                      label="Thời gian thuê"
                      rules={[
                        {
                          required: true,
                          message: 'Vui lòng chọn thời gian thuê!',
                        },
                      ]}
                    >
                      <Select
                        showSearch
                        defaultValue="Tháng"
                        style={{ width: '100%' }}
                        placeholder="Theo thời gian"
                        optionFilterProp="children"
                        onChange={(value: any) => setTimeRent(value)}
                      >
                        <Option key="Đêm" value="Đêm">
                          Đêm
                        </Option>
                        <Option key="Ngày" value="Ngày">
                          Ngày
                        </Option>
                        <Option key="Tuần" value="Tuần">
                          Tuần
                        </Option>
                        <Option key="Tháng" value="Tháng">
                          Tháng
                        </Option>
                        <Option key="Quý" value="Quý">
                          Quý
                        </Option>
                        <Option key="Năm" value="Năm">
                          Năm
                        </Option>
                      </Select>
                    </Form.Item>
                  </Col>
                </Row>

                {/* new row */}
                <Row style={{ display: 'flex', justifyContent: 'center' }}>
                  <Col
                    xs={24}
                    xl={12}
                    style={{ width: ' 100%', paddingRight: 10 }}
                  >
                    <Form.Item
                      name="electricityPriceByNumber"
                      label={`Tiền điện`}
                      rules={[
                        {
                          required: true,
                          message: 'Vui lòng nhập tiền điện!',
                        },
                      ]}
                    >
                      <InputNumber
                        style={{ width: '100%' }}
                        placeholder="Đơn giá"
                        step={1000}
                        min="0"
                        // type="number"
                        formatter={(value) => convertPrice(value)}
                        addonAfter="kWh"
                      />
                    </Form.Item>
                  </Col>
                  <Col
                    xs={24}
                    xl={12}
                    style={{ width: ' 100%', paddingLeft: 10 }}
                  >
                    <Form.Item
                      name="waterPricePerMonth"
                      label={`Tiền nước`}
                      rules={[
                        {
                          required: true,
                          message: 'Vui lòng nhập tiền nước!',
                        },
                      ]}
                    >
                      <InputNumber
                        style={{ width: '100%' }}
                        placeholder="Đơn giá"
                        step={1000}
                        min="0"
                        // type="number"
                        formatter={(value) => convertPrice(value)}
                        addonAfter="VND"
                      />
                    </Form.Item>
                  </Col>
                </Row>

                {/* new row */}
                <Row style={{ display: 'flex', justifyContent: 'center' }}>
                  <Col
                    xs={24}
                    xl={12}
                    style={{ width: ' 100%', paddingRight: 10 }}
                  >
                    <Form.Item
                      name="amenities"
                      label="Tiện ích phòng"
                      // rules={[
                      //   {
                      //     required: true,
                      //     message: 'Vui lòng nhập Tiện ích phòng!',
                      //   },
                      // ]}
                    >
                      <div className="amenities__house">
                        <Input
                          placeholder="Tìm kiếm tiện ích phòng"
                          style={{ width: '100%' }}
                          onChange={(e) => filterCheckbox(e)}
                        />
                        <br />
                        <br />
                        <div className="checkbox-group">
                          <Checkbox.Group
                            options={
                              typeof searchTerm !== 'undefined'
                                ? searchResult
                                : amenityOptions
                            }
                            onChange={onChange}
                            value={valueAmenitiesCheckbox}
                          />
                        </div>
                      </div>
                    </Form.Item>
                  </Col>
                  <Col
                    xs={24}
                    xl={12}
                    style={{ width: ' 100%', paddingLeft: 10 }}
                  >
                    <Form.Item name="deposit" label="Đặt cọc">
                      <InputNumber
                        style={{ width: '100%' }}
                        placeholder="Số tiền đặt cọc"
                        step={500000}
                        min="0"
                        // type="number"
                        formatter={(value) => convertPrice(value)}
                        addonAfter="VND"
                      />
                    </Form.Item>
                  </Col>
                </Row>

                {/* new row */}
                <Row style={{ display: 'flex', justifyContent: 'center' }}>
                  <Col
                    xs={24}
                    xl={12}
                    style={{ width: '100%', paddingRight: 10 }}
                  >
                    <Form.Item name="roomMate" label={`Phòng dành cho`}>
                      <Select defaultValue={'Nam & Nữ'}>
                        <Option key={'MF'} value={'MF'}>
                          Nam & Nữ
                        </Option>
                        <Option key={'M'} value={'M'}>
                          Nam
                        </Option>
                        <Option key={'F'} value={'F'}>
                          Nữ
                        </Option>
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col
                    xs={24}
                    xl={12}
                    style={{ width: ' 100%', paddingLeft: 10 }}
                  >
                    <Form.Item name="status" label={`Trạng thái phòng`}>
                      <Select
                        defaultValue={true}
                        disabled={stateRoomDetail?.dataResponse?.check}
                      >
                        <Option key={'1'} value={true}>
                          Còn phòng
                        </Option>
                        <Option key={'2'} value={false}>
                          Hết phòng
                        </Option>
                      </Select>
                    </Form.Item>
                  </Col>
                </Row>

                {/* new row */}
                <Row
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    marginTop: 20,
                  }}
                >
                  <Col xs={24} xl={24} style={{ width: ' 100%' }}>
                    <Form.Item
                      name="description"
                      label="Mô tả thêm"
                      rules={[{ required: true, message: 'Nhập mô tả phòng!' }]}
                    >
                      {/* <TextArea
                      style={{ width: '100%' }}
                      rows={9}
                      placeholder="Mô tả thêm"
                    /> */}
                      <CKEditor
                        editor={ClassicEditor}
                        data={
                          stateRoomDetail?.dataResponse?.description
                            ? stateRoomDetail?.dataResponse?.description
                            : ''
                        }
                        onReady={(editor) => {
                          // You can store the "editor" and use when it is needed.
                        }}
                        onChange={(event, editor) => {
                          const data = editor.getData();
                          setDescriptionState(data);
                          props?.form.setFieldsValue({
                            description: data,
                          });
                        }}
                        onBlur={(event, editor) => {}}
                        onFocus={(event, editor) => {}}
                      />
                    </Form.Item>
                  </Col>
                </Row>

                {/* new row */}
                <Row
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    marginTop: 20,
                  }}
                >
                  <Col xs={24} xl={24} style={{ width: ' 100%' }}>
                    <Form.Item
                      name="images"
                      getValueFromEvent={getFile}
                      rules={[
                        { required: true, message: 'Nhập thông tin hình ảnh!' },
                      ]}
                      label="Ảnh hoặc video phòng (tối đa 20)"
                    >
                      <Upload
                        action="http://www.mocky.io/v2/596a5f03110000920701cd92"
                        listType="picture-card"
                        maxCount={20}
                        multiple
                        fileList={fileList}
                        beforeUpload={() => {
                          return false;
                        }}
                        accept=".PNG,.JPG"
                        onPreview={handlePreview}
                        onChange={handleChangeUpload}
                      >
                        {fileList.length >= 20 ? null : uploadButton}
                      </Upload>
                    </Form.Item>
                  </Col>
                </Row>
                <div className="mt-50 flex justify-between">
                  <p style={{ color: '#ff4d4f' }} className="mt-10">
                    (*): Thông tin bắt buộc
                  </p>
                  <Button
                    type="primary"
                    htmlType="submit"
                    loading={stateRoomDetail?.btnUpdateLoading}
                  >
                    Lưu
                  </Button>
                </div>
              </Col>
            </Row>
          </Form>
        </div>
        <Modal
          visible={previewVisible}
          title={previewTitle}
          footer={null}
          onCancel={() => setPreviewVisible(false)}
        >
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </Spin>
    </Fragment>
  );
};
