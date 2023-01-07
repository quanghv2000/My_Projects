import {
  Form,
  Button,
  Row,
  Col,
  Input,
  Radio,
  Select,
  DatePicker,
  Space,
  Upload,
  InputNumber,
} from 'antd';
import React, { Fragment, useState } from 'react';
import { useHistory } from 'react-router-dom';
import type { RadioChangeEvent, DatePickerProps } from 'antd';
import { useSelector } from 'react-redux';
import { convertPrice } from 'helper/convert-price-to-vnd';
import { RootState } from 'types/RootState';
import { vietnameseStringToUnicode } from 'helper/search-vietnamese-words';
import { PlusOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const { Option } = Select;
const { TextArea } = Input;

export const RoomDetailCustomerTab: React.FC<any> = () => {
  const history = useHistory();
  const [fileUpload, setFileUpload]: any = useState([]);
  const [value, setValue] = useState(1);
  const onchangeUpload = async (files: any) => {
    setFileUpload(files);
  };

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Thêm</div>
    </div>
  );

  const state = useSelector(
    (state: RootState) => state?.hostHouseCreatePageReducer
  );

  const onChangeDatePicker: DatePickerProps['onChange'] = (
    date,
    dateString
  ) => {
  };

  const onChange = (e: RadioChangeEvent) => {
    setValue(e.target.value);
  };

  const onFinish = () => {};
  const onFinishFailed = () => {};
  return (
    <Fragment>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          width: ' 100%',
        }}
      >
        <Form
          name="basic"
          layout="vertical"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          style={{
            width: ' 100%',
            padding: '20px 20px',
            display: 'flex',
            justifyContent: 'center',
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
                  label="Họ và tên"
                  name="name"
                  rules={[
                    {
                      required: true,
                      message: 'Vui lòng nhập Họ và tên !',
                    },
                  ]}
                >
                  <Input style={{ width: '100%' }} placeholder="Họ và tên" />
                </Form.Item>
              </Col>
              <Col
                xs={12}
                xl={12}
                style={{ width: ' 100%', padding: '0px 20px' }}
              >
                <Form.Item name="name" label="CMND/ CCCD">
                  <Input style={{ width: '100%' }} placeholder="CMND/ CCCD" />
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
                <Form.Item label=" " name="name">
                  <Radio.Group onChange={onChange} value={value}>
                    <Radio value={1}>Nam</Radio>
                    <Radio value={2}>Nữ</Radio>
                  </Radio.Group>
                  {/* <Link to="/files/myfile.pdf" target="_blank" download>Download</Link> */}
                  <Button
                    className="ml-50"
                    type="primary"
                    // onClick={() => {
                    //   <Link to="/files/myfile.pdf" target="_blank" download>
                    //     Download
                    //   </Link>;
                    // }}
                  >
                    Lấy danh sách khách thuê
                  </Button>
                </Form.Item>
              </Col>
              <Col
                xs={12}
                xl={12}
                style={{ width: ' 100%', padding: '0px 20px' }}
              >
                <Form.Item name="name" label="Ngày cấp">
                  <Input style={{ width: '100%' }} placeholder="Ngày cấp" />
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
                <Form.Item label="Điện thoại 1" name="name">
                  <Input
                    style={{ width: '100%' }}
                    type="number"
                    placeholder="Điện thoại 1"
                  />
                </Form.Item>
              </Col>
              <Col
                xs={12}
                xl={12}
                style={{ width: ' 100%', padding: '0px 20px' }}
              >
                <Form.Item name="name" label="Nơi cấp">
                  <Select
                    showSearch
                    style={{ width: '100%' }}
                    placeholder="Tỉnh/ Thành phố"
                    // onChange={handleChangeCity}
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
            </Row>

            {/* new row */}
            <Row>
              <Col
                xs={12}
                xl={12}
                style={{ width: ' 100%', padding: '0px 20px' }}
              >
                <Form.Item label="Điện thoại 2" name="name">
                  <Input style={{ width: '100%' }} placeholder="Điện thoại 2" />
                </Form.Item>
              </Col>
              <Col
                xs={12}
                xl={12}
                style={{ width: ' 100%', padding: '0px 20px' }}
              >
                <Form.Item name="email" label="Email">
                  <Input style={{ width: '100%' }} placeholder="Email" />
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
                <Form.Item label="Ngày sinh" name="date">
                  <DatePicker
                    format="DD/MM/yyyy"
                    style={{ width: '100%' }}
                    onChange={onChangeDatePicker}
                    placeholder="Ngày sinh (dd/MM/yyyy)"
                  />
                </Form.Item>
              </Col>
              <Col
                xs={12}
                xl={12}
                style={{ width: ' 100%', padding: '0px 20px' }}
              >
                <Form.Item name="email" label="Nơi sinh">
                  <Select
                    showSearch
                    style={{ width: '100%' }}
                    placeholder="Tỉnh/ Thành phố"
                    // onChange={handleChangeCity}
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
            </Row>

            {/* new row */}
            <Row>
              <Col
                xs={12}
                xl={12}
                style={{ width: ' 100%', padding: '0px 20px' }}
              >
                <Form.Item label="Thuê phòng" name="roomName">
                  <Input
                    disabled
                    defaultValue="Phòng D102"
                    style={{ width: '100%' }}
                    placeholder="Tên phòng"
                  />
                </Form.Item>
              </Col>
              <Col
                xs={12}
                xl={12}
                style={{ width: ' 100%', padding: '0px 20px' }}
              >
                <Form.Item
                  name="name"
                  label="Tiền phòng"
                  rules={[
                    {
                      required: true,
                      message: 'Vui lòng nhập Tiền phòng !',
                    },
                  ]}
                >
                  <InputNumber
                    style={{ width: '100%' }}
                    addonAfter="VND"
                    placeholder="Tiền phòng"
                    formatter={(value) => convertPrice(value)}
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
                <Form.Item
                  label="Ngày bắt đầu"
                  name="startDate"
                  rules={[
                    {
                      required: true,
                      message: 'Vui lòng nhập ngày bắt đầu !',
                    },
                  ]}
                >
                  <DatePicker
                    format="DD/MM/yyyy"
                    style={{ width: '100%' }}
                    onChange={onChangeDatePicker}
                    placeholder="Ngày sinh (dd/MM/yyyy)"
                  />
                </Form.Item>
              </Col>
              <Col
                xs={12}
                xl={12}
                style={{ width: ' 100%', padding: '0px 20px' }}
              >
                <Form.Item
                  name="name"
                  label="Đặt cọc"
                  rules={[
                    {
                      required: true,
                      message: 'Vui lòng nhập Đặt cọc!',
                    },
                  ]}
                >
                  <InputNumber
                    style={{ width: '100%' }}
                    placeholder="Đặt cọc"
                    addonAfter="VND"
                    formatter={(value) => convertPrice(value)}
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
                <Form.Item label="Ghi chú khác" name="village">
                  <TextArea
                    style={{ width: '100%' }}
                    rows={3}
                    placeholder="Nhập ghi chú khác"
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
                <Form.Item label="Hình ảnh (tối đa 5)" name="village">
                  <Space
                    direction="vertical"
                    style={{ width: '100%' }}
                    size="large"
                  >
                    <Upload
                      action="http://www.mocky.io/v2/596a5f03110000920701cd92"
                      listType="picture-card"
                      maxCount={5}
                      multiple
                      onChange={onchangeUpload}
                      beforeUpload={() => {
                        return false;
                      }}
                      accept=".PNG,JPG"
                    >
                      {uploadButton}
                    </Upload>
                  </Space>
                </Form.Item>
              </Col>
            </Row>

            {/* end of form col */}
          </Col>
        </Form>
      </div>
    </Fragment>
  );
};
