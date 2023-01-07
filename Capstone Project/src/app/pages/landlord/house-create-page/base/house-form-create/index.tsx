import { PlusOutlined } from '@ant-design/icons';
import {
  Button,
  Checkbox,
  Col,
  Form,
  Input,
  InputNumber,
  message,
  Modal,
  PageHeader,
  Row,
  Select,
  Upload,
} from 'antd';
import 'app/pages/landlord/house-create-page/base/house-form-create/style.scss';
import { houseDirection } from 'app/pages/landlord/house-create-page/base/house-form-create/template';
import {
  hostHouseCreateRequest,
  hostHouseGetDistrictRequest,
  hostHouseGetVillageRequest,
  btnCreateLoading,
} from 'app/pages/landlord/house-create-page/screen/action';
import { getBase64, getFile } from 'helper/handle-upload';
import { vietnameseStringToUnicode } from 'helper/search-vietnamese-words';
import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { RootState } from 'types/RootState';
import {
  DEFAULT_APP_SECOND_UPLOAD_CLOUNDINARY,
  DEFAULT_GOOGLE_MAP_API_KEY,
} from 'utils/config';
import { validatePatternPhoneNumber } from 'utils/validate';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const { Option } = Select;

const { TextArea } = Input;

const containerStyle = {
  width: '100%',
  height: '100%',
};

export const HouseFormCreate: React.FC<any> = () => {
  // history react dom to change link
  const history = useHistory();
  const userInfoCookies = localStorage.getItem('user-info');
  // const userInfoCookies = getCookie('user-info');
  let userInfo: any;

  if (userInfoCookies) {
    userInfo = JSON.parse(userInfoCookies);
  }
  const success = () => {
    message.success({
      content: 'Thêm mới thành công',
      className: 'custom-class',
    });
  };
  const [amenityOptions, setAmenityOptions]: any = useState([]);
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const state = useSelector(
    (state: RootState) => state?.hostHouseCreatePageReducer
  );

  const stateAdmin = useSelector(
    (state: RootState) => state?.adminTypeOfRentalPageReducer
  );

  const stateAdminAmenity = useSelector(
    (state: RootState) => state?.adminAmenityPageReducer
  );

  const [valueAmenitiesCheckbox, setValueAmenitiesCheckbox]: any = useState([]);
  const [curentLocation, setCurentLocation] = useState(false);
  const [position, setPosition]: any = useState({
    lat: 21.01351,
    lng: 105.527096,
  });

  function onChange(checkedValues) {
    setValueAmenitiesCheckbox(checkedValues);
  }

  useEffect(() => {
    if (userInfo?.phoneNumber) {
      form.setFieldsValue({
        phoneNumber: userInfo?.phoneNumber,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userInfo]);

  useEffect(() => {
    if (state.statusCreate === 'created' && !state?.btnCreate) {
      success();
      history.push('/host/house');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.statusCreate]);

  useEffect(() => {
    if (stateAdminAmenity?.dataResponse) {
      const amenity =
        stateAdminAmenity?.dataResponse?.length > 0
          ? stateAdminAmenity?.dataResponse
          : [];

      let newAmenityArray: any = [];

      // eslint-disable-next-line array-callback-return
      amenity?.map((item) => {
        if (item.type === 'house') {
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

  useEffect(() => {
    if (state?.dataResponseDistrict) {
      setValueDistrict(state?.dataResponseDistrict);
      setValueSelectedDistrict(true);
    }
  }, [state?.dataResponseDistrict]);

  useEffect(() => {
    if (state?.dataResponseVillage) {
      setValueVillage(state?.dataResponseVillage);
      setValueSelectedVillage(true);
    }
  }, [state?.dataResponseVillage]);

  const [searchTerm, setSearchTerm] = useState();
  const [searchResult, setSearchResult] = useState();

  // handle change city, district , village
  const [valueSelectedDistrict, setValueSelectedDistrict]: any =
    useState(false);
  const [valueSelectedVillage, setValueSelectedVillage]: any = useState(false);

  const [valueDistrict, setValueDistrict]: any = useState([]);
  const [valueVillage, setValueVillage]: any = useState([]);

  const [fileList, setFileList]: any = useState([]);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewTitle, setPreviewTitle] = useState('');
  const [previewImage, setPreviewImage]: any = useState('');

  const filterCheckbox = (e: any) => {
    const searchVal = e.target.value;
    setSearchTerm(searchVal);
    const result: any = amenityOptions?.filter((arrayVal: any) => {
      return vietnameseStringToUnicode(
        arrayVal?.label.toLowerCase()
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

  // handle change in city select box
  const handleChangeCity = (value: any) => {
    form.setFieldsValue({
      quanhuyen: undefined,
      phuongxa: undefined,
    });
    setValueSelectedDistrict(false);
    setValueSelectedVillage(false);
    setValueDistrict([]);
    setValueVillage([]);
    dispatch(hostHouseGetDistrictRequest(value));
  };

  // handle change in district select box
  const handleChangeDistrict = (value: any) => {
    form.setFieldsValue({
      phuongxa: undefined,
    });
    setValueSelectedVillage(false);
    setValueVillage([]);
    dispatch(hostHouseGetVillageRequest(value));
  };

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

  const onFinish = (values: any) => {
    dispatch(btnCreateLoading(''));
    const url = DEFAULT_APP_SECOND_UPLOAD_CLOUNDINARY;
    const formData = new FormData();
    for (let i = 0; i < fileList.length; i++) {
      let file = fileList[i];
      formData.append('file', file?.originFileObj);
      formData.append('upload_preset', 'ml_default');

      fetch(url, {
        method: 'POST',
        body: formData,
      })
        .then((response) => {
          return response.text();
        })
        .then((data) => {
          let dataAmenity: any = [];
          // eslint-disable-next-line array-callback-return
          valueAmenitiesCheckbox?.map((item: any) => {
            dataAmenity.push({ id: item });
          });

          const body = {
            name: form.getFieldValue('name'),
            user: {
              id: userInfo?.id,
            },
            area: form.getFieldValue('area'),
            description: form.getFieldValue('description'),
            houseDirection: form.getFieldValue('houseDirection'),
            address: {
              street: form.getFieldValue('address'),
              longiude: form.getFieldValue('longiude')
                ? parseFloat(form.getFieldValue('longiude'))
                : null,
              latitude: form.getFieldValue('latitude')
                ? parseFloat(form.getFieldValue('latitude'))
                : null,
              phuongXa: {
                id: form.getFieldValue('phuongxa'),
              },
            },
            typeOfRental: {
              id: form.getFieldValue('typeOfRental'),
            },
            linkFb: form.getFieldValue('linkFb'),
            phoneNumber: form.getFieldValue('phoneNumber'),
            amenities: dataAmenity,
            imageUrl: JSON.parse(data)?.url
              ? JSON.parse(data)?.url
              : form?.getFieldValue('image'),
          };

          dispatch(hostHouseCreateRequest(body));
        });
    }
  };

  return (
    <Fragment>
      <div
        className="mt-10"
        style={{
          display: 'flex',
          justifyContent: 'center',
          width: ' 100%',
        }}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          autoComplete="off"
          style={{ width: ' 100%' }}
        >
          <PageHeader
            className="site-page-header mb-20"
            onBack={() => history.push('/host/house')}
            title="Thêm nhà"
            extra={[
              <Button
                className="ml-20"
                style={{
                  backgroundColor: '#fa8c16',
                  borderColor: '#fa8c16',
                  color: 'white',
                }}
                onClick={() => history.push('/host/house')}
              >
                <i className="fa-solid fa-rotate-left mr-5"></i> Quay về
              </Button>,
              <Button
                style={{
                  backgroundColor: '#13c2c2',
                  borderColor: '#13c2c2',
                  color: 'white',
                }}
                htmlType="submit"
              >
                <i className="fa-solid fa-plus mr-5"></i> Tạo nhà
              </Button>,
            ]}
          />{' '}
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
                marginRight: 30,
              }}
            >
              {/* new row */}
              <Row style={{ display: 'flex', justifyContent: 'center' }}>
                <Col
                  xs={24}
                  xl={12}
                  style={{ width: ' 100%', paddingRight: 10 }}
                >
                  <Form.Item
                    name="name"
                    label="Tên nhà"
                    rules={[
                      {
                        required: true,
                        message: 'Vui lòng nhập Tên nhà !',
                      },
                    ]}
                  >
                    {/* <p>
                      Tên nhà <span style={{ color: '#ff4d4f' }}>*</span>
                    </p> */}
                    <Input style={{ width: '100%' }} placeholder="Tên nhà" />
                  </Form.Item>
                </Col>
                <Col
                  xs={24}
                  xl={12}
                  style={{ width: ' 100%', paddingLeft: 10 }}
                >
                  <Form.Item name="houseDirection" label="Hướng nhà">
                    <Select
                      showSearch
                      style={{ width: '100%' }}
                      placeholder="Hướng nhà"
                      optionFilterProp="children"
                      filterOption={(input, option: any) =>
                        vietnameseStringToUnicode(option.children)
                          .toLowerCase()
                          .indexOf(
                            vietnameseStringToUnicode(input.toLowerCase())
                          ) >= 0
                      }
                    >
                      {houseDirection.map((item: any, key: any) => {
                        return (
                          <Option key={key} value={item}>
                            {item}
                          </Option>
                        );
                      })}
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
                    name="typeOfRental"
                    label="Loại hình cho thuê"
                    rules={[
                      {
                        required: true,
                        message: 'Vui lòng nhập Loại hình cho thuê !',
                      },
                    ]}
                  >
                    <Select
                      showSearch
                      style={{ width: '100%' }}
                      placeholder="Loại hình cho thuê"
                      optionFilterProp="children"
                      filterOption={(input, option: any) =>
                        vietnameseStringToUnicode(option.children)
                          .toLowerCase()
                          .indexOf(
                            vietnameseStringToUnicode(input.toLowerCase())
                          ) >= 0
                      }
                      filterSort={(optionA, optionB) => {
                        if (optionA?.children && optionB?.children) {
                          return vietnameseStringToUnicode(optionA?.children)
                            .toLowerCase()
                            .localeCompare(
                              vietnameseStringToUnicode(
                                optionB?.children?.toLowerCase()
                              )
                            );
                        }
                      }}
                    >
                      {stateAdmin?.dataResponse?.length > 0
                        ? stateAdmin?.dataResponse?.map(
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
                    name="phoneNumber"
                    label="Số điện thoại"
                    rules={[
                      {
                        required: true,
                        message: 'Vui lòng nhập Số điện thoại liên hệ !',
                      },
                      {
                        pattern: validatePatternPhoneNumber,
                        message: 'Vui lòng nhập đúng định dạng số điện thoại',
                      },
                    ]}
                  >
                    {/* <p>
                      Tên nhà <span style={{ color: '#ff4d4f' }}>*</span>
                    </p> */}
                    <Input
                      style={{ width: '100%' }}
                      placeholder="Số điện thoại"
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
                  <Form.Item name="amenities" label="Tiện ích nhà">
                    <div className="amenities__house">
                      <Input
                        placeholder="Tìm kiếm tiện ích nhà"
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
                  <Form.Item name="linkFb" label="Facebook">
                    <Input
                      placeholder="Nhập facebook"
                      style={{ width: '100%' }}
                    />
                  </Form.Item>
                </Col>
              </Row>

              {/* new row */}
              <Row style={{ display: 'flex', justifyContent: 'center' }}>
                <Col xs={24} xl={24} style={{ width: ' 100%' }}>
                  <Form.Item
                    name="description"
                    label="Mô tả về nhà"
                    rules={[
                      {
                        required: true,
                        message: 'Vui lòng nhập mô tả về nhà !',
                      },
                    ]}
                  >
                    <TextArea
                      style={{ width: '100%' }}
                      rows={3}
                      placeholder="Mô tả về nhà"
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
                    label="Tỉnh/ Thành phố"
                    name="thanhpho"
                    rules={[
                      {
                        required: true,
                        message: 'Vui lòng nhập Tỉnh/ Thành phố !',
                      },
                    ]}
                  >
                    <Select
                      showSearch
                      allowClear
                      style={{ width: '100%' }}
                      placeholder="Tỉnh/ Thành phố"
                      onChange={handleChangeCity}
                      optionFilterProp="children"
                      filterOption={(input, option: any) =>
                        vietnameseStringToUnicode(option.children)
                          .toLowerCase()
                          .indexOf(
                            vietnameseStringToUnicode(input.toLowerCase())
                          ) >= 0
                      }
                      filterSort={(optionA, optionB) =>
                        vietnameseStringToUnicode(optionA.children)
                          .toLowerCase()
                          .localeCompare(
                            vietnameseStringToUnicode(
                              optionB.children.toLowerCase()
                            )
                          )
                      }
                    >
                      {state?.dataResponseCity?.length > 0
                        ? state?.dataResponseCity?.map(
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
                    name="quanhuyen"
                    label="Quận/ huyện"
                    rules={[
                      {
                        required: true,
                        message: 'Vui lòng nhập Quận/ huyện !',
                      },
                    ]}
                  >
                    <Select
                      showSearch
                      style={{ width: '100%' }}
                      placeholder="Quận/ huyện"
                      onChange={handleChangeDistrict}
                      optionFilterProp="children"
                      filterOption={(input, option: any) =>
                        vietnameseStringToUnicode(option.children)
                          .toLowerCase()
                          .indexOf(
                            vietnameseStringToUnicode(input.toLowerCase())
                          ) >= 0
                      }
                      filterSort={(optionA, optionB) =>
                        vietnameseStringToUnicode(optionA.children)
                          .toLowerCase()
                          .localeCompare(
                            vietnameseStringToUnicode(
                              optionB.children.toLowerCase()
                            )
                          )
                      }
                    >
                      {valueDistrict?.length > 0 && valueSelectedDistrict
                        ? valueDistrict?.map((item: any, key: any) => {
                            return (
                              <Option key={key} value={item?.id}>
                                {item?.name}
                              </Option>
                            );
                          })
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
                    label="Phường/ xã"
                    name="phuongxa"
                    rules={[
                      {
                        required: true,
                        message: 'Vui lòng nhập Phường/ xã !',
                      },
                    ]}
                  >
                    <Select
                      showSearch
                      style={{ width: '100%' }}
                      placeholder="Phường/ xã"
                      // onChange={() => handleChangeVillage}
                      optionFilterProp="children"
                      filterOption={(input, option: any) =>
                        vietnameseStringToUnicode(option.children)
                          .toLowerCase()
                          .indexOf(
                            vietnameseStringToUnicode(input.toLowerCase())
                          ) >= 0
                      }
                      filterSort={(optionA, optionB) =>
                        vietnameseStringToUnicode(optionA.children)
                          .toLowerCase()
                          .localeCompare(
                            vietnameseStringToUnicode(
                              optionB.children.toLowerCase()
                            )
                          )
                      }
                    >
                      {valueVillage?.length > 0 && valueSelectedVillage
                        ? valueVillage?.map((item: any, key: any) => {
                            return (
                              <Option key={key} value={item?.id}>
                                {item?.name}
                              </Option>
                            );
                          })
                        : ''}
                    </Select>
                  </Form.Item>
                </Col>
                <Col
                  xs={24}
                  xl={12}
                  style={{ width: ' 100%', paddingLeft: 10 }}
                >
                  <Form.Item label="Diện tích nhà" name="area">
                    <InputNumber
                      style={{ width: '100%' }}
                      placeholder="Diện tích"
                      addonAfter="m²"
                    />
                  </Form.Item>
                </Col>
              </Row>

              {/* new row */}
              <Row style={{ display: 'flex', justifyContent: 'center' }}>
                <Col xs={24} xl={24} style={{ width: ' 100%' }}>
                  <Form.Item
                    label="Địa chỉ"
                    name="address"
                    rules={[
                      { required: true, message: 'Vui lòng nhập Địa chỉ !' },
                    ]}
                  >
                    <TextArea
                      style={{ width: '100%' }}
                      rows={3}
                      placeholder="Địa chỉ"
                    />
                  </Form.Item>
                </Col>
              </Row>

              {/* new row */}
              <Row>
                <Col xs={12} xl={12} style={{ width: ' 100%' }}>
                  <Form.Item
                    style={{ width: '100%' }}
                    label="Lấy vị trí hiện tại"
                  >
                    <Checkbox
                      checked={curentLocation}
                      onChange={(e: any) => {
                        setCurentLocation(e.target.checked);

                        if (e.target.checked) {
                          if (navigator.geolocation) {
                            navigator.geolocation.getCurrentPosition(
                              function (position) {
                                // Get current cordinates.
                                const pos = {
                                  lat: position.coords.latitude,
                                  lng: position.coords.longitude,
                                };
                                setPosition({
                                  lat: pos.lat,
                                  lng: pos.lng,
                                });
                                form.setFieldsValue({
                                  latitude: pos.lat,
                                  longiude: pos.lng,
                                });
                              },
                              function (error) {
                                // On error code..
                              },
                              {
                                maximumAge: 60000,
                                timeout: 10000,
                                enableHighAccuracy: true,
                              }
                            );
                          }
                        } else {
                          form.setFieldsValue({
                            longiude: '',
                            latitude: '',
                          });
                          setPosition({
                            lat: 21.01351,
                            lng: 105.527096,
                          });
                        }
                      }}
                    >
                      Lấy toạ độ vị trí hiện tại của bạn
                    </Checkbox>
                  </Form.Item>
                </Col>
                <Col
                  xs={12}
                  xl={12}
                  style={{ width: ' 100%', padding: '0px 20px' }}
                ></Col>
              </Row>

              {/* new row */}
              <Row
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                }}
              >
                <Col
                  xs={24}
                  xl={12}
                  style={{ width: ' 100%', paddingRight: 10 }}
                >
                  <Form.Item
                    name="latitude"
                    label="Vĩ độ"
                    rules={[
                      {
                        required: true,
                        message:
                          'Vui lòng nhập vĩ độ hoặc tích chọn vị trí hiện tại !',
                      },
                    ]}
                  >
                    <Input
                      onChange={(e: any) => {
                        setCurentLocation(false);
                        setPosition({
                          lat: parseFloat(e?.target?.value),
                          lng: parseFloat(form.getFieldValue('longiude')),
                        });
                      }}
                      style={{ width: '100%' }}
                      placeholder="Vĩ độ"
                    />
                  </Form.Item>
                </Col>
                <Col
                  xs={24}
                  xl={12}
                  style={{ width: ' 100%', paddingLeft: 10 }}
                >
                  <Form.Item
                    name="longiude"
                    label="Kinh độ"
                    rules={[
                      {
                        required: true,
                        message:
                          'Vui lòng nhập kinh độ hoặc tích chọn vị trí hiện tại !',
                      },
                    ]}
                  >
                    <Input
                      onChange={(e: any) => {
                        setCurentLocation(false);
                        setPosition({
                          lat: parseFloat(form.getFieldValue('latitude')),
                          lng: parseFloat(e?.target?.value),
                        });
                      }}
                      style={{ width: '100%' }}
                      placeholder="Kinh độ"
                    />
                  </Form.Item>
                </Col>
              </Row>

              <Row
                style={{
                  width: '100%',
                  height: '500px',
                  marginTop: 30,
                }}
              >
                <Col xs={24} xl={24} style={{ width: ' 100%' }}>
                  <LoadScript
                    googleMapsApiKey={DEFAULT_GOOGLE_MAP_API_KEY}
                    libraries={['places']}
                  >
                    <GoogleMap
                      mapContainerStyle={containerStyle}
                      center={position}
                      zoom={15}
                      onClick={(ev: any) => {
                        setCurentLocation(false);
                        setPosition({
                          lat: ev.latLng.lat(),
                          lng: ev.latLng.lng(),
                        });
                        form.setFieldsValue({
                          latitude: ev.latLng.lat(),
                          longiude: ev.latLng.lng(),
                        });
                      }}
                      // clickableIcons={false}
                    >
                      <Marker position={position} />
                    </GoogleMap>
                  </LoadScript>
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
                    name="image"
                    label="Thêm ảnh nhà"
                    getValueFromEvent={getFile}
                    rules={[
                      { required: true, message: 'Nhập thông tin hình ảnh!' },
                    ]}
                  >
                    <Upload
                      action="http://www.mocky.io/v2/596a5f03110000920701cd92"
                      listType="picture-card"
                      maxCount={1}
                      multiple
                      fileList={fileList}
                      beforeUpload={() => {
                        return false;
                      }}
                      accept=".PNG,.JPG,.JPEG"
                      onPreview={handlePreview}
                      onChange={handleChangeUpload}
                    >
                      {fileList.length >= 1 ? null : uploadButton}
                    </Upload>
                  </Form.Item>
                </Col>
              </Row>

              <div className="mt-50 flex justify-between">
                <p style={{ color: '#ff4d4f' }} className="mt-10">
                  (*): Thông tin bắt buộc
                </p>
                <Button
                  style={{
                    backgroundColor: '#13c2c2',
                    borderColor: '#13c2c2',
                    color: 'white',
                  }}
                  htmlType="submit"
                  loading={state?.btnCreate}
                >
                  <i className="fa-solid fa-plus mr-5"></i> Tạo nhà
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
    </Fragment>
  );
};
