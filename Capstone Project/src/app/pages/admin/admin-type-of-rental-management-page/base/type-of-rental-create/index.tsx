import React, { useState, useEffect } from 'react';
import { Modal, Form, Input, Upload, message, Button } from 'antd';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { RootState } from 'types/RootState';
import {
  createDataTypeOfRentalRequest,
  getDataTypeOfRentalRequest,
} from 'app/pages/admin/admin-type-of-rental-management-page/screen/action';
import { PlusOutlined } from '@ant-design/icons';
import { getBase64, getFile } from 'helper/handle-upload';
import { DEFAULT_APP_UPLOAD_CLOUNDIANRY } from 'utils/config';

const TypeOfRentalCreate = (props) => {
  const dispatch = useDispatch();
  const [fileImage, setFileImage]: any = useState([]);
  const [fileIcon, setFileIcon]: any = useState([]);
  // Preview image modal
  const [previewImageVisible, setPreviewImageVisible] = useState(false);
  const [previewImageTitle, setPreviewImageTitle] = useState('');
  const [previewImage, setPreviewImage]: any = useState('');

  // Preview icon modal
  const [previewIconVisible, setPreviewIconVisible] = useState(false);
  const [previewIconTitle, setPreviewIconTitle] = useState('');
  const [previewIcon, setPreviewIcon]: any = useState('');

  const state = useSelector(
    (state: RootState) => state?.adminTypeOfRentalPageReducer
  );

  const [form] = Form.useForm();

  const success = () => {
    message.success({
      content: 'Thêm mới thành công',
      className: 'custom-class',
    });
  };

  useEffect(() => {
    if (state && !state?.loadingBtnCreate && props?.isModalCreateVisible) {
      props.setIsModalCreateVisible(false);
      form.resetFields();
      setFileImage([]);
      setFileIcon([]);
      dispatch(getDataTypeOfRentalRequest(''));
      success();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  const handleChangeUploadImage: any = (fileImage: any) => {
    setFileImage(fileImage.fileList);
  };

  const handleChangeUploadIcon: any = (fileIcon: any) => {
    setFileIcon(fileIcon.fileList);
  };

  const onFinish = async () => {
    const urlUploadCloudinary = DEFAULT_APP_UPLOAD_CLOUNDIANRY;
    const formDataImage = new FormData();
    const formDataIcon = new FormData();

    formDataImage.append('file', fileImage[0]?.originFileObj);
    formDataImage.append('upload_preset', 'ml_default');

    formDataIcon.append('file', fileIcon[0]?.originFileObj);
    formDataIcon.append('upload_preset', 'ml_default');

    const imageUrlUploaded: any = await fetch(urlUploadCloudinary, {
      method: 'POST',
      body: formDataImage,
    })
      .then((respone) => {
        return respone.text();
      })
      .catch((error) => {
        return error;
      });

    const iconUrlUploaded: any = await fetch(urlUploadCloudinary, {
      method: 'POST',
      body: formDataIcon,
    })
      .then((response) => {
        return response.text();
      })
      .catch((error) => {
        return error;
      });

    const body: any = {
      id: props?.data?.id,
      name: form?.getFieldValue('name'),
      description: form?.getFieldValue('description'),
      imageUrl: JSON.parse(imageUrlUploaded)?.url,
      icon: JSON.parse(iconUrlUploaded)?.url,
    };
    dispatch(createDataTypeOfRentalRequest(body));
  };

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Thêm</div>
    </div>
  );

  const handlePreviewImage = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImageTitle(
      file.name || file.url.substring(file.url.lastIndexOf('/') + 1)
    );
    setPreviewImage(file.url || file.preview);
    setPreviewImageVisible(true);
  };

  const handlePreviewIcon = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewIconTitle(
      file.name || file.url.substring(file.url.lastIndexOf('/') + 1)
    );
    setPreviewIcon(file.url || file.preview);
    setPreviewIconVisible(true);
  };

  const handleCancel = () => {
    form.resetFields();
    setFileImage([]);
    setFileIcon([]);
    props.setIsModalCreateVisible(false);
  };

  const onFinishFailed = (errorInfo: any) => {};

  return (
    <>
      <Modal
        title="Thêm loại hình cho thuê"
        visible={props.isModalCreateVisible}
        confirmLoading={state?.loadingBtnCreate}
        footer={null}
        onCancel={handleCancel}
        width="750px"
      >
        <Form
          name="basic"
          labelCol={{ span: 6 }}
          form={form}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <div style={{ paddingTop: '20px', paddingRight: '65px' }}>
            <Form.Item
              label="Tên loại hình:"
              name="name"
              rules={[
                { required: true, message: 'Nhập tên loại hình!' },
                {
                  max: 100,
                  message: 'Tên loại hình không vượt quá 100 ký tự!',
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Mô tả:"
              name="description"
              rules={[{ required: true, message: 'Nhập thông tin mô tả!' }]}
            >
              <Input.TextArea rows={4} />
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
                fileList={fileImage}
                maxCount={1}
                beforeUpload={() => {
                  return false;
                }}
                accept=".PNG,.JPG,.JPEG"
                onPreview={handlePreviewImage}
                onChange={handleChangeUploadImage}
              >
                {fileImage.length >= 1 ? null : uploadButton}
              </Upload>
            </Form.Item>
            <Form.Item
              label="Icon:"
              name="icon"
              getValueFromEvent={getFile}
              rules={[{ required: true, message: 'Nhập thông tin icon!' }]}
            >
              <Upload
                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                listType="picture-card"
                fileList={fileIcon}
                maxCount={1}
                beforeUpload={() => {
                  return false;
                }}
                accept=".PNG,.JPG,.JPEG"
                onPreview={handlePreviewIcon}
                onChange={handleChangeUploadIcon}
              >
                {fileIcon.length >= 1 ? null : uploadButton}
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
                  loading={state?.loadingBtnCreate}
                  htmlType="submit"
                  style={{
                    backgroundColor: '#1890ff',
                    borderColor: '#1890ff',
                    color: 'white',
                  }}
                >
                  Tạo
                </Button>
              </div>
            </Form.Item>
          </div>
          <Modal
            visible={previewImageVisible}
            title={previewImageTitle}
            footer={null}
            onCancel={() => setPreviewImageVisible(false)}
          >
            <img alt="example" style={{ width: '100%' }} src={previewImage} />
          </Modal>
          <Modal
            visible={previewIconVisible}
            title={previewIconTitle}
            footer={null}
            onCancel={() => setPreviewIconVisible(false)}
          >
            <img alt="example" style={{ width: '100%' }} src={previewIcon} />
          </Modal>
        </Form>
      </Modal>
    </>
  );
};

export default TypeOfRentalCreate;
