import {
  Form,
  Button,
  Row,
  Col,
  Input,
  Checkbox,
  Select,
  message,
  Space,
  Upload,
  InputNumber,
  Modal,
} from 'antd';
import React, { Fragment, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
// import type { DatePickerProps } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
// import { convertPrice } from 'helper/convert-price-to-vnd';
import { RootState } from 'types/RootState';
import { vietnameseStringToUnicode } from 'helper/search-vietnamese-words';
import { PlusOutlined } from '@ant-design/icons';
import { houseDirection } from 'app/pages/landlord/house-create-page/base/house-form-create/template';
import {
  hostHouseGetDistrictRequest,
  hostHouseGetVillageRequest,
} from 'app/pages/landlord/house-create-page/screen/action';
import { DEFAULT_GOOGLE_MAP_API_KEY } from 'utils/config';
import { clearHouseListAmenity } from 'app/pages/landlord/host-house-detail-page/screen/action';
import 'app/pages/landlord/host-house-detail-page/base/house-detail-info-tab/style.scss';
import { getBase64, getFile } from 'helper/handle-upload';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
// import { Link } from 'react-router-dom';

const { Option } = Select;
const { TextArea } = Input;

const containerStyle = {
  width: '100%',
  height: '100%',
};

export const HouseDetailInfoTab: React.FC<any> = (props: any) => {
  const form = props?.form;
  const history = useHistory();
  const dispatch = useDispatch();

  const state = useSelector(
    (state: RootState) => state?.hostHouseCreatePageReducer
  );

  const stateAdmin = useSelector(
    (state: RootState) => state?.adminTypeOfRentalPageReducer
  );

  const stateAdminAmenity = useSelector(
    (state: RootState) => state?.adminAmenityPageReducer
  );

  const stateHouseDetail = useSelector(
    (state: RootState) => state?.houseDetailPageReducer
  );

  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewTitle, setPreviewTitle] = useState('');
  const [previewImage, setPreviewImage]: any = useState('');

  const [amenityOptions, setAmenityOptions]: any = useState([]);

  // handle change city, district , village
  const [valueSelectedDistrict, setValueSelectedDistrict]: any =
    useState(false);
  const [valueSelectedVillage, setValueSelectedVillage]: any = useState(false);

  const [valueDistrict, setValueDistrict]: any = useState([]);
  const [valueVillage, setValueVillage]: any = useState([]);

  const [curentLocation, setCurentLocation] = useState(false);
  const [position, setPosition]: any = useState({
    lat: 21.01351,
    lng: 105.527096,
  });

  const [searchTerm, setSearchTerm] = useState();
  const [searchResult, setSearchResult] = useState();

  const success = () => {
    message.success({
      content: 'S???a th??nh c??ng',
      className: 'custom-class',
    });
  };

  useEffect(() => {
    if (stateHouseDetail?.statusUpdate === 'update') {
      success();
      dispatch(clearHouseListAmenity(''));
      history.push('/host/house');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stateHouseDetail.statusUpdate]);

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

  const handleChangeUpload = ({ fileList }) => {
    props?.setFileList(fileList);
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

  useEffect(() => {
    if (stateHouseDetail?.dataResponse) {
      const image: any = {
        uid: '-1',
        name: 'anh',
        url: stateHouseDetail?.dataResponse?.imageUrl,
        status: 'done',
      };
      let imageList: any = [];
      imageList.push(image);
      props?.setFileList(imageList);
      let amenityArray: any = [];

      setPosition({
        lat: parseFloat(stateHouseDetail?.dataResponse?.address?.latitude),
        lng: parseFloat(stateHouseDetail?.dataResponse?.address?.longiude),
      });
      // eslint-disable-next-line array-callback-return
      stateHouseDetail?.dataResponse?.amenities?.map((item: any) => {
        amenityArray.push(item?.id);
      });
      props?.setValueAmenitiesCheckbox(amenityArray);
      form.setFieldsValue({
        name: stateHouseDetail?.dataResponse?.name,
        houseDirection: stateHouseDetail?.dataResponse?.houseDirection,
        area: stateHouseDetail?.dataResponse?.area,
        thanhpho:
          stateHouseDetail?.dataResponse?.address?.phuongXa?.quanHuyen?.thanhPho
            ?.name,
        quanhuyen:
          stateHouseDetail?.dataResponse?.address?.phuongXa?.quanHuyen?.name,
        phuongxa: stateHouseDetail?.dataResponse?.address?.phuongXa?.name,
        longiude: parseFloat(stateHouseDetail?.dataResponse?.address?.longiude),
        latitude: parseFloat(stateHouseDetail?.dataResponse?.address?.latitude),
        address: stateHouseDetail?.dataResponse?.address?.street,
        typeOfRental: stateHouseDetail?.dataResponse?.typeOfRental?.name,
        phoneNumber: stateHouseDetail?.dataResponse?.phoneNumber,
        linkFb: stateHouseDetail?.dataResponse?.linkFb,
        description: stateHouseDetail?.dataResponse?.description,
        roomCount: stateHouseDetail?.dataResponse?.roomDetails?.roomCount,
        roomAvailability:
          stateHouseDetail?.dataResponse?.roomDetails?.roomAvailability,
        image: stateHouseDetail?.dataResponse?.imageUrl,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stateHouseDetail?.dataResponse]);

  const filterCheckbox = (e: any) => {
    const searchVal = e.target.value;
    setSearchTerm(searchVal);
    const result: any = amenityOptions?.filter((arrayVal: any) => {
      return vietnameseStringToUnicode(arrayVal.toLowerCase()).startsWith(
        vietnameseStringToUnicode(searchVal.toLowerCase())
      );
    });
    setSearchResult(result);
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

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Th??m</div>
    </div>
  );

  const onChangeAmenity = (checkedValues: any) => {
    props?.setValueAmenitiesCheckbox(checkedValues);
  };

  return (
    <Fragment>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          width: ' 100%',
          marginTop: 10,
          marginBottom: 10,
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
          {/* new row */}
          <Row>
            <Col
              xs={12}
              xl={12}
              style={{ width: ' 100%', padding: '0px 20px' }}
            >
              <Form.Item
                label="T??n nh??"
                name="name"
                rules={[
                  {
                    required: true,
                    message: 'Vui l??ng nh???p T??n nh?? !',
                  },
                ]}
              >
                <Input style={{ width: '100%' }} placeholder="T??n nh??" />
              </Form.Item>
            </Col>
            <Col
              xs={12}
              xl={12}
              style={{ width: ' 100%', padding: '0px 20px' }}
            >
              <Form.Item name="houseDirection" label="H?????ng nh??">
                <Select
                  showSearch
                  style={{ width: '100%' }}
                  placeholder="H?????ng nh??"
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
          <Row>
            <Col
              xs={12}
              xl={12}
              style={{ width: ' 100%', padding: '0px 20px' }}
            >
              <Form.Item
                name="typeOfRental"
                label="Lo???i h??nh cho thu??"
                rules={[
                  {
                    required: true,
                    message: 'Vui l??ng nh???p Lo???i h??nh cho thu?? !',
                  },
                ]}
              >
                <Select
                  showSearch
                  style={{ width: '100%' }}
                  placeholder="Lo???i h??nh cho thu??"
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
                    ? stateAdmin?.dataResponse?.map((item: any, key: any) => {
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
              xs={12}
              xl={12}
              style={{ width: ' 100%', padding: '0px 20px' }}
            >
              <Form.Item
                rules={[
                  {
                    required: true,
                    message: 'Vui l??ng nh???p s??? ??i???n tho???i !',
                  },
                  {
                    pattern: /(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/,
                    message: 'Vui l??ng nh???p ????ng ?????nh d???ng s??? ??i???n tho???i',
                  },
                ]}
                name="phoneNumber"
                label="S??? ??i???n tho???i li??n h???"
              >
                <Input
                  style={{ width: '100%' }}
                  placeholder="S??? ??i???n tho???i li??n h???"
                />
              </Form.Item>
            </Col>
          </Row>

          {/* new row */}
          <Row>
            <Col
              xs={12}
              xl={12}
              style={{ width: ' 100%', padding: '0px 20px' }}
            >
              <Form.Item label="T???ng s??? ph??ng" name="roomCount">
                <Input
                  disabled
                  suffix="Ph??ng"
                  style={{ width: '100%' }}
                  placeholder="T???ng s??? ph??ng"
                />
              </Form.Item>
            </Col>
            <Col
              xs={24}
              xl={12}
              style={{ width: ' 100%', padding: '0px 20px' }}
            >
              <Form.Item name="linkFb" label="Facebook">
                <Input placeholder="Nh???p facebook" style={{ width: '100%' }} />
              </Form.Item>
            </Col>
          </Row>

          {/* new row */}
          <Row>
            <Col
              xs={12}
              xl={12}
              style={{ width: ' 100%', padding: '0px 20px' }}
            >
              <Form.Item name="amenities" label="Ti???n ??ch nh??">
                <div className="amenities__detail-house">
                  <Input
                    placeholder="T??m ki???m ti???n ??ch nh??"
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
                      value={props?.valueAmenitiesCheckbox}
                      onChange={onChangeAmenity}
                    />
                  </div>
                </div>
              </Form.Item>
            </Col>
            <Col
              xs={12}
              xl={12}
              style={{ width: ' 100%', padding: '0px 20px' }}
            >
              <Form.Item
                name="description"
                label="M?? t??? v??? nh??"
                rules={[
                  {
                    required: true,
                    message: 'Vui l??ng nh???p m?? t??? v??? nh?? !',
                  },
                ]}
              >
                <TextArea
                  style={{ width: '100%' }}
                  rows={3}
                  placeholder="M?? t??? v??? nh??"
                />
              </Form.Item>
            </Col>
          </Row>

          {/* new row */}
          <Row>
            <Col
              xs={12}
              xl={12}
              style={{ width: ' 100%', padding: '0px 20px' }}
            >
              <Form.Item name="thanhpho" label="T???nh/ Th??nh ph???">
                <Select
                  showSearch
                  style={{ width: '100%' }}
                  placeholder="T???nh/ Th??nh ph???"
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
                    ? state?.dataResponseCity?.map((item: any, key: any) => {
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
              xs={12}
              xl={12}
              style={{ width: ' 100%', padding: '0px 20px' }}
            >
              <Form.Item
                name="quanhuyen"
                label="Qu???n/ huy???n"
                rules={[
                  {
                    required: true,
                    message: 'Vui l??ng nh???p Qu???n/ huy???n !',
                  },
                ]}
              >
                <Select
                  showSearch
                  style={{ width: '100%' }}
                  placeholder="Qu???n/ huy???n"
                  onChange={handleChangeDistrict}
                  optionFilterProp="children"
                  filterOption={(input, option: any) =>
                    vietnameseStringToUnicode(option.children)
                      .toLowerCase()
                      .indexOf(
                        vietnameseStringToUnicode(input?.toLowerCase())
                      ) >= 0
                  }
                  filterSort={(optionA, optionB) =>
                    vietnameseStringToUnicode(optionA?.children)
                      .toLowerCase()
                      .localeCompare(
                        vietnameseStringToUnicode(
                          optionB?.children?.toLowerCase()
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
          <Row>
            <Col
              xs={12}
              xl={12}
              style={{ width: ' 100%', padding: '0px 20px' }}
            >
              <Form.Item
                label="Ph?????ng/ x??"
                name="phuongxa"
                rules={[
                  {
                    required: true,
                    message: 'Vui l??ng nh???p Ph?????ng/ x?? !',
                  },
                ]}
              >
                <Select
                  showSearch
                  style={{ width: '100%' }}
                  placeholder="Ph?????ng/ x??"
                  // onChange={() => handleChangeVillage}
                  optionFilterProp="children"
                  filterOption={(input, option: any) =>
                    vietnameseStringToUnicode(option.children)
                      .toLowerCase()
                      .indexOf(
                        vietnameseStringToUnicode(input?.toLowerCase())
                      ) >= 0
                  }
                  filterSort={(optionA, optionB) =>
                    vietnameseStringToUnicode(optionA?.children)
                      .toLowerCase()
                      .localeCompare(
                        vietnameseStringToUnicode(
                          optionB?.children?.toLowerCase()
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
              xs={12}
              xl={12}
              style={{ width: ' 100%', padding: '0px 20px' }}
            >
              <Form.Item label="Di???n t??ch nh??" name="area">
                <InputNumber
                  style={{ width: '100%' }}
                  addonAfter="m??"
                  placeholder="Di???n t??ch"
                />
              </Form.Item>
            </Col>
          </Row>

          {/* new row */}
          <Row>
            <Col
              xs={24}
              xl={24}
              style={{ width: ' 100%', padding: '0px 20px' }}
            >
              <Form.Item
                label="?????a ch???"
                name="address"
                rules={[{ required: true, message: 'Vui l??ng nh???p ?????a ch??? !' }]}
              >
                <TextArea
                  style={{ width: '100%' }}
                  rows={3}
                  placeholder="?????a ch???"
                />
              </Form.Item>
            </Col>
          </Row>

          {/* new row */}
          <Row
            style={{
              display: 'flex',
              justifyContent: 'center',
              padding: '0px 20px',
            }}
          >
            <Col xs={12} xl={12} style={{ width: ' 100%' }}>
              <Form.Item style={{ width: '100%' }} label="L???y v??? tr?? hi???n t???i">
                <Checkbox
                  checked={curentLocation}
                  onChange={(e: any) => {
                    setCurentLocation(e.target.checked);

                    if (e.target.checked) {
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
                  L???y to??? ????? v??? tr?? hi???n t???i c???a b???n
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
              padding: '0px 20px',
            }}
          >
            <Col xs={24} xl={12} style={{ width: ' 100%', paddingRight: 10 }}>
              <Form.Item
                name="latitude"
                label="V?? ?????"
                rules={[
                  {
                    required: true,
                    message:
                      'Vui l??ng nh???p v?? ????? ho???c t??ch ch???n v??? tr?? hi???n t???i !',
                  },
                ]}
              >
                <Input
                  onChange={(e: any) => {
                    setPosition({
                      lat: parseFloat(e?.target?.value),
                      lng: parseFloat(form.getFieldValue('longiude')),
                    });
                  }}
                  style={{ width: '100%' }}
                  placeholder="V?? ?????"
                />
              </Form.Item>
            </Col>
            <Col xs={24} xl={12} style={{ width: ' 100%', paddingLeft: 10 }}>
              <Form.Item
                name="longiude"
                label="Kinh ?????"
                rules={[
                  {
                    required: true,
                    message:
                      'Vui l??ng nh???p kinh ????? ho???c t??ch ch???n v??? tr?? hi???n t???i !',
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
                  placeholder="Kinh ?????"
                />
              </Form.Item>
            </Col>
          </Row>

          <Row
            style={{
              width: '100%',
              height: '500px',
              marginTop: 30,
              padding: '0px 20px',
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
          <Row>
            <Col
              xs={24}
              xl={24}
              style={{ width: ' 100%', padding: '0px 20px' }}
            >
              <Form.Item
                getValueFromEvent={getFile}
                label="H??nh ???nh nh??"
                name="image"
                rules={[
                  { required: true, message: 'Nh???p th??ng tin h??nh ???nh!' },
                ]}
              >
                <Upload
                  action="http://www.mocky.io/v2/596a5f03110000920701cd92"
                  listType="picture-card"
                  maxCount={1}
                  multiple
                  fileList={props?.fileList}
                  beforeUpload={() => {
                    return false;
                  }}
                  onPreview={handlePreview}
                  onChange={handleChangeUpload}
                  accept=".PNG,.JPG"
                >
                  {props?.fileList.length >= 1 ? null : uploadButton}
                </Upload>
              </Form.Item>
            </Col>
          </Row>

          {/* end of form col */}
        </Col>
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
