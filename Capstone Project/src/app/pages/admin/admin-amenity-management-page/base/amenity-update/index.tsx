import React, { useState, useEffect } from 'react';
import { Modal, Form, Input, message, Upload, Button, Select } from 'antd';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { RootState } from 'types/RootState';
import {
  updateDataAmenityRequest,
  getDataAmenityRequest,
} from 'app/pages/admin/admin-amenity-management-page/screen/action';
import { PlusOutlined } from '@ant-design/icons';
import { getBase64, getFile } from 'helper/handle-upload';
import { DEFAULT_APP_UPLOAD_CLOUNDIANRY } from 'utils/config';

const { Option } = Select;

const AmenityUpdate = (props) => {
  const dispatch = useDispatch();
  const [fileList, setFileList]: any = useState([]);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewTitle, setPreviewTitle] = useState('');
  const [previewImage, setPreviewImage]: any = useState('');
  const [amenityTypeUpdate, setAmenityTypeUpdate] = useState();

  const handleChange = (value) => {
    setAmenityTypeUpdate(value);
  };

  const state = useSelector(
    (state: RootState) => state?.adminAmenityPageReducer
  );

  const handleCancel = () => {
    props.setIsModalUpdateVisible(false);
  };

  const handleChangeUpload = ({ fileList }) => {
    setFileList(fileList);
  };

  const [form] = Form.useForm();

  const success = () => {
    message.success({
      content: 'Chỉnh sửa thành công',
      className: 'custom-class',
    });
  };

  useEffect(() => {
    if (state && !state?.loadingBtnUpdate && props?.isModalUpdateVisible) {
      props.setIsModalUpdateVisible(false);
      dispatch(getDataAmenityRequest(''));
      success();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  const passDataFromProps = () => {
    const image: any = {
      uid: '-1',
      name: props?.data?.name,
      url: props?.data?.icon,
      status: 'done',
    };
    let imageList: any = [];
    imageList.push(image);
    setFileList(imageList);

    setPreviewTitle(props?.data?.name);
    form.setFieldsValue({
      name: props?.data?.name,
      type: props?.data?.type,
      image: props?.data?.icon,
    });
  };

  useEffect(() => {
    if (props?.data) {
      passDataFromProps();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props?.data, form]);

  useEffect(() => {
    if (props?.data && props?.isModalUpdateVisible) {
      passDataFromProps();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props?.isModalUpdateVisible]);

  const onFinish = async () => {
    const urlUploadCloudinary = DEFAULT_APP_UPLOAD_CLOUNDIANRY;
    const formDataIcon = new FormData();
    let iconUrl: any = fileList[0].url;

    if (fileList[0].uid !== '-1') {
      formDataIcon.append('file', fileList[0]?.originFileObj);
      formDataIcon.append('upload_preset', 'ml_default');

      const iconUrlUploaded: any = await fetch(urlUploadCloudinary, {
        method: 'POST',
        body: formDataIcon,
      })
        .then((respone) => {
          return respone.text();
        })
        .catch((error) => {
          return error;
        });
      iconUrl = JSON.parse(iconUrlUploaded)?.url;
    }

    const body: any = {
      id: props?.data?.id,
      name: form?.getFieldValue('name'),
      type: amenityTypeUpdate ? amenityTypeUpdate : props?.data?.type,
      icon: iconUrl,
    };

    dispatch(updateDataAmenityRequest(body));
  };

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Thêm</div>
    </div>
  );

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

  const onFinishFailed = (er) => {
  };

  return (
    <>
      <Modal
        title="Chỉnh sửa tiện nghi"
        visible={props.isModalUpdateVisible}
        footer={null}
        onCancel={handleCancel}
        confirmLoading={state?.loadingBtnUpdate}
        width="800px"
      >
        <Form
          name="basic"
          form={form}
          labelCol={{ span: 6 }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <div style={{ paddingTop: '20px', paddingRight: '65px' }}>
            <Form.Item
              label="Tên tiện nghi:"
              name="name"
              rules={[
                { required: true, message: 'Nhập tên tiện nghi!' },
                {
                  max: 100,
                  message: 'Tên tiện nghi không vượt quá 100 ký tự!',
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item label="Tiện nghi dành cho:" name="type">
              <Select
                style={{ width: '100%' }}
                onChange={handleChange}
                defaultValue={amenityTypeUpdate}
              >
                <Option value="house">Nhà</Option>
                <Option value="room">Phòng</Option>
              </Select>
            </Form.Item>
            <Form.Item
              label="Hình ảnh:"
              name="image"
              getValueFromEvent={getFile}
              rules={[{ required: true, message: 'Nhập thông tin hình ảnh!' }]}
            >
              <Upload
                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                listType="picture-card"
                fileList={fileList}
                beforeUpload={() => {
                  return false;
                }}
                accept=".PNG,.JPG,.JPEG"
                onPreview={handlePreview}
                // onPreview={() => setPreviewVisible(true)}
                onChange={handleChangeUpload}
              >
                {fileList.length >= 1 ? null : uploadButton}
              </Upload>
            </Form.Item>
            <Form.Item
              className="button-form"
              style={{
                margin: '0px 0px 10px 0px',
                display: 'flex',
                width: '100%',
                justifyContent: 'flex-end',
              }}
            >
              <div
                style={{
                  marginTop: 30,
                  display: 'flex',
                  width: '100%',
                  justifyContent: 'flex-end',
                }}
              >
                <Button
                  onClick={handleCancel}
                  style={{ backgroundColor: '#fff', marginRight: 10 }}
                >
                  Đóng
                </Button>
                <Button
                  loading={state?.loadingBtnUpdate}
                  htmlType="submit"
                  style={{
                    backgroundColor: '#1890ff',
                    borderColor: '#1890ff',
                    color: 'white',
                  }}
                >
                  Lưu
                </Button>
              </div>
            </Form.Item>
          </div>
        </Form>
        <Modal
          visible={previewVisible}
          title={previewTitle}
          footer={null}
          onCancel={() => setPreviewVisible(false)}
        >
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </Modal>
    </>
  );
};

export default AmenityUpdate;
