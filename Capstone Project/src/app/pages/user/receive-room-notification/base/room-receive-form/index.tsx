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
  Typography,
  Row,
  Select,
  Slider,
} from 'antd';
import 'app/pages/landlord/house-create-page/base/house-form-create/style.scss';
import { houseDirection } from 'app/pages/landlord/house-create-page/base/house-form-create/template';
import {
  hostHouseCreateRequest,
  hostHouseGetDistrictRequest,
  hostHouseGetVillageRequest,
} from 'app/pages/landlord/house-create-page/screen/action';
import { getBase64 } from 'helper/handle-upload';
import { vietnameseStringToUnicode } from 'helper/search-vietnamese-words';
import React, { Fragment, useEffect, useState } from 'react';
import { convertPrice } from 'helper/convert-price-to-vnd';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { RootState } from 'types/RootState';
import { DEFAULT_APP_SECOND_UPLOAD_CLOUNDINARY } from 'utils/config';

const { Option } = Select;

export const RoomReceiveForm: React.FC<any> = () => {
  const { Text } = Typography;

  const [budget, setBudget] = useState({
    minValue: 0,
    maxValue: 500000,
  });

  const onHandleBudgetChange = (e: any) => {
    form.setFieldsValue({
      minPrice: e[0],
      maxPrice: e[1],
    });
    setBudget({ minValue: e[0], maxValue: e[1] });
  };
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
  const [amenityRoomOptions, setAmenityRoomOptions]: any = useState([]);
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

  const stateCategoryRoom = useSelector(
    (state: RootState) => state?.adminRoomCategoryPageReducer
  );

  const [valueAmenitiesCheckbox, setValueAmenitiesCheckbox]: any = useState([]);

  function onChange(checkedValues) {
    setValueAmenitiesCheckbox(checkedValues);
  }

  useEffect(() => {
    if (state.statusCreate === 'created' && !state?.btnCreate) {
      success();
      history.push('/host/house');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.statusCreate]);

  useEffect(() => {
    if (userInfo?.email) {
      form.setFieldsValue({
        email: userInfo?.email,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userInfo?.email]);

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
      setAmenityRoomOptions(newAmenityArray);
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
              longiude: null,
              latitude: null,
              phuongXa: {
                id: form.getFieldValue('phuongxa'),
              },
            },
            typeOfRental: {
              id: form.getFieldValue('typeOfRental'),
            },
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
        style={{
          display: 'flex',
          justifyContent: 'center',
          width: ' 100%',
          paddingTop: 120,
        }}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          autoComplete="off"
          style={{ width: ' 100%' }}
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
              xl={17}
              style={{
                width: '100%',
                padding: '20px 30px',
                boxShadow: 'rgb(0 0 0 / 15%) 0px 1px 4px',
                borderRadius: 5,
                marginRight: 30,
              }}
            >
              <div
                style={{
                  marginBottom: 20,
                  fontWeight: 'bold',
                  color: '#1890ff',
                  fontSize : 16
                }}
              >
                Nhận thông báo tìm phòng
              </div>
              {/* new row */}
              <Row style={{ display: 'flex', justifyContent: 'center' }}>
                <Col
                  xs={24}
                  xl={12}
                  style={{ width: ' 100%', paddingRight: 10 }}
                >
                  <Form.Item
                    name="email"
                    label="Email nhận thông báo"
                    rules={[
                      {
                        required: true,
                        message: 'Vui lòng nhập Email !',
                      },
                      {
                        pattern:
                          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                        message: 'Vui lòng nhập đúng định dạng email!',
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
                  <Form.Item label="Diện tích" name="area">
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
                      filterOption={(input, option: any) => {
                        if (option?.children) {
                          return vietnameseStringToUnicode(option?.children)
                            .toLowerCase()
                            .indexOf(
                              vietnameseStringToUnicode(input?.toLowerCase())
                            );
                        }
                      }}
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
                  <Form.Item
                    name="amenities"
                    label="Tiện ích phòng"
                    rules={[
                      {
                        required: true,
                        message: 'Vui lòng nhập Tiện ích phòng!',
                      },
                    ]}
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
                              : amenityRoomOptions
                          }
                          onChange={onChange}
                        />
                      </div>
                    </div>
                  </Form.Item>
                </Col>
              </Row>

              {/* new row */}
              <Row style={{ display: 'flex', justifyContent: 'center' }}>
                <Col xs={24} xl={24} style={{ width: ' 100%', marginTop: 50 }}>
                  <Form.Item name="name" label="Giá phòng trong khoảng">
                    <Slider
                      range
                      // defaultValue={[0, 1000000]}
                      defaultValue={[budget.minValue, budget.maxValue]}
                      value={[budget.minValue, budget.maxValue]}
                      step={100000}
                      max={10000000}
                      onChange={(e) => onHandleBudgetChange(e)}
                      marks={{
                        0: '0',
                        1000000: '1.000.000',
                        2000000: '2.000.000',
                        3000000: '3.000.000',
                        4000000: '4.000.000',
                        5000000: '5.000.000',
                        6000000: '6.000.000',
                        7000000: '7.000.000',
                        8000000: '8.000.000',
                        9000000: '9.000.000',
                        10000000: '10 Tr',
                      }}
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
                    name="minPrice"
                    label="Giá thấp nhất"
                    rules={[
                      {
                        required: true,
                        message: 'Vui lòng nhập giá thấp nhất!',
                      },
                    ]}
                  >
                    <InputNumber
                      className="budget-number"
                      value={budget.minValue}
                      min={0}
                      style={{ width: '100%' }}
                      max={10000000}
                      step={100000}
                      formatter={(value) => convertPrice(value)}
                      addonAfter="VND"
                      onChange={(value) =>
                        setBudget({
                          ...budget,
                          minValue: value,
                        })
                      }
                    />
                  </Form.Item>
                </Col>
                <Col
                  xs={24}
                  xl={12}
                  style={{ width: ' 100%', paddingLeft: 10 }}
                >
                  <Form.Item
                    name="maxPrice"
                    label="Giá cao nhất"
                    rules={[
                      {
                        required: true,
                        message: 'Vui lòng nhập giá cao nhất!',
                      },
                    ]}
                  >
                    <InputNumber
                      className="budget-number"
                      value={budget.maxValue}
                      min={0}
                      max={10000000}
                      step={100000}
                      style={{ width: '100%' }}
                      addonAfter="VND"
                      formatter={(value) => convertPrice(value)}
                      onChange={(value) =>
                        setBudget({
                          ...budget,
                          maxValue: value,
                        })
                      }
                    />
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
                  Xác nhận
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
