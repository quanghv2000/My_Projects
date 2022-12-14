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
  const [timeRent, setTimeRent] = useState('Th??ng');

  const success = () => {
    message.success({
      content: 'Ch???nh s???a th??nh c??ng',
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
      return 'Nam & N???';
    }
    if (gen === 'M') {
      return 'Nam ';
    }
    if (gen === 'F') {
      return ' N???';
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
          name: '???nh',
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
          : 'Nam & N???',
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
      <div style={{ marginTop: 8 }}>Th??m</div>
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
        message.error('H??? th???ng x???y ra l???i vui l??ng th??? l???i sau!');
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
                      label="T??n ph??ng"
                      rules={[
                        {
                          required: true,
                          message: 'Vui l??ng nh???p T??n ph??ng !',
                        },
                      ]}
                    >
                      <Input
                        style={{ width: '100%' }}
                        placeholder="T??n ph??ng"
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
                      label="Di???n t??ch"
                      rules={[
                        {
                          required: true,
                          message: 'Vui l??ng nh???p Di???n t??ch !',
                        },
                      ]}
                    >
                      <Input
                        style={{ width: '100%' }}
                        placeholder="Di???n t??ch"
                        type="number"
                        suffix="m??"
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
                      label="Nh??"
                      rules={[
                        {
                          required: true,
                          message: 'Vui l??ng nh???p nh?? !',
                        },
                      ]}
                    >
                      <Select
                        showSearch
                        style={{ width: '100%' }}
                        placeholder="T??? nh??"
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
                      label="S??? ng?????i t???i ??a"
                      rules={[
                        {
                          required: true,
                          message: 'Nh???p th??ng S??? l?????ng ng?????i t???i ??a!',
                        },
                      ]}
                    >
                      <Input
                        style={{ width: '100%' }}
                        placeholder="S??? l?????ng ng?????i t???i ??a"
                        type="number"
                        suffix="ng?????i"
                      />
                    </Form.Item>
                    {/* <Form.Item name="floor" label="T???ng">
                      <Select
                        showSearch
                        style={{ width: '100%' }}
                        placeholder="T??? nh??"
                        optionFilterProp="children"
                        filterOption={(input, option: any) =>
                          vietnameseStringToUnicode(option.children)
                            .toLowerCase()
                            .indexOf(
                              vietnameseStringToUnicode(input.toLowerCase())
                            ) >= 0
                        }
                      >
                        <Option value="1">T???ng 1</Option>
                        <Option value="2">T???ng 2</Option>
                        <Option value="3">T???ng 3</Option>
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
                      label="Danh m???c ph??ng"
                      rules={[
                        {
                          required: true,
                          message: 'Vui l??ng nh???p Danh m???c ph??ng !',
                        },
                      ]}
                    >
                      <Select
                        showSearch
                        style={{ width: '100%' }}
                        placeholder="Danh m???c ph??ng"
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
                      label="Lo???i ph??ng"
                      rules={[
                        {
                          required: true,
                          message: 'Vui l??ng ch???n lo???i ph??ng!',
                        },
                      ]}
                    >
                      <Select
                        showSearch
                        style={{ width: '100%' }}
                        placeholder="Lo???i ph??ng"
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
                      label={`????n gi??/${timeRent}`}
                      rules={[
                        {
                          required: true,
                          message: 'Vui l??ng nh???p ????n gi??!',
                        },
                      ]}
                    >
                      <InputNumber
                        style={{ width: '100%' }}
                        placeholder="????n gi??"
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
                      label="Th???i gian thu??"
                      rules={[
                        {
                          required: true,
                          message: 'Vui l??ng ch???n th???i gian thu??!',
                        },
                      ]}
                    >
                      <Select
                        showSearch
                        defaultValue="Th??ng"
                        style={{ width: '100%' }}
                        placeholder="Theo th???i gian"
                        optionFilterProp="children"
                        onChange={(value: any) => setTimeRent(value)}
                      >
                        <Option key="????m" value="????m">
                          ????m
                        </Option>
                        <Option key="Ng??y" value="Ng??y">
                          Ng??y
                        </Option>
                        <Option key="Tu???n" value="Tu???n">
                          Tu???n
                        </Option>
                        <Option key="Th??ng" value="Th??ng">
                          Th??ng
                        </Option>
                        <Option key="Qu??" value="Qu??">
                          Qu??
                        </Option>
                        <Option key="N??m" value="N??m">
                          N??m
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
                      label={`Ti???n ??i???n`}
                      rules={[
                        {
                          required: true,
                          message: 'Vui l??ng nh???p ti???n ??i???n!',
                        },
                      ]}
                    >
                      <InputNumber
                        style={{ width: '100%' }}
                        placeholder="????n gi??"
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
                      label={`Ti???n n?????c`}
                      rules={[
                        {
                          required: true,
                          message: 'Vui l??ng nh???p ti???n n?????c!',
                        },
                      ]}
                    >
                      <InputNumber
                        style={{ width: '100%' }}
                        placeholder="????n gi??"
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
                      label="Ti???n ??ch ph??ng"
                      // rules={[
                      //   {
                      //     required: true,
                      //     message: 'Vui l??ng nh???p Ti???n ??ch ph??ng!',
                      //   },
                      // ]}
                    >
                      <div className="amenities__house">
                        <Input
                          placeholder="T??m ki???m ti???n ??ch ph??ng"
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
                    <Form.Item name="deposit" label="?????t c???c">
                      <InputNumber
                        style={{ width: '100%' }}
                        placeholder="S??? ti???n ?????t c???c"
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
                    <Form.Item name="roomMate" label={`Ph??ng d??nh cho`}>
                      <Select defaultValue={'Nam & N???'}>
                        <Option key={'MF'} value={'MF'}>
                          Nam & N???
                        </Option>
                        <Option key={'M'} value={'M'}>
                          Nam
                        </Option>
                        <Option key={'F'} value={'F'}>
                          N???
                        </Option>
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col
                    xs={24}
                    xl={12}
                    style={{ width: ' 100%', paddingLeft: 10 }}
                  >
                    <Form.Item name="status" label={`Tr???ng th??i ph??ng`}>
                      <Select
                        defaultValue={true}
                        disabled={stateRoomDetail?.dataResponse?.check}
                      >
                        <Option key={'1'} value={true}>
                          C??n ph??ng
                        </Option>
                        <Option key={'2'} value={false}>
                          H???t ph??ng
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
                      label="M?? t??? th??m"
                      rules={[{ required: true, message: 'Nh???p m?? t??? ph??ng!' }]}
                    >
                      {/* <TextArea
                      style={{ width: '100%' }}
                      rows={9}
                      placeholder="M?? t??? th??m"
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
                        { required: true, message: 'Nh???p th??ng tin h??nh ???nh!' },
                      ]}
                      label="???nh ho???c video ph??ng (t???i ??a 20)"
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
                    (*): Th??ng tin b???t bu???c
                  </p>
                  <Button
                    type="primary"
                    htmlType="submit"
                    loading={stateRoomDetail?.btnUpdateLoading}
                  >
                    L??u
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
