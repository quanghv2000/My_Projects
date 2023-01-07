import React, { useState, useEffect } from 'react';
import { Modal, Form, Input, Upload, message, Button } from 'antd';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { RootState } from 'types/RootState';
import {
  createDataBankAccountRequest,
  getDataBankAccountRequest,
} from 'app/pages/admin/admin-bank-account-management-page/screen/action';
import { PlusOutlined } from '@ant-design/icons';
import { getBase64, getFile } from 'helper/handle-upload';
import { DEFAULT_APP_UPLOAD_CLOUNDIANRY } from 'utils/config';

const BankAccountCreate = (props) => {
  const dispatch = useDispatch();
  const [fileImage, setFileImage]: any = useState([]);
  // Preview image modal
  const [previewImageVisible, setPreviewImageVisible] = useState(false);
  const [previewImageTitle, setPreviewImageTitle] = useState('');
  const [previewImage, setPreviewImage]: any = useState('');

  const state = useSelector(
    (state: RootState) => state?.adminBankAccountPageReducer
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
      dispatch(getDataBankAccountRequest(''));
      success();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  const handleChangeUploadImage: any = (fileImage: any) => {
    setFileImage(fileImage.fileList);
  };

  const onFinish = async () => {
    const urlUploadCloudinary = DEFAULT_APP_UPLOAD_CLOUNDIANRY;
    const formDataImage = new FormData();

    formDataImage.append('file', fileImage[0]?.originFileObj);
    formDataImage.append('upload_preset', 'ml_default');

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

    const body: any = {
      id: props?.data?.id,
      bankName: form?.getFieldValue('bankName'),
      username: form?.getFieldValue('username'),
      numberAccount: form?.getFieldValue('numberAccount'),
      branch: form?.getFieldValue('branch'),
      imageUrl: JSON.parse(imageUrlUploaded)?.url,
    };
    dispatch(createDataBankAccountRequest(body));
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

  const handleCancel = () => {
    form.resetFields();
    setFileImage([]);
    props.setIsModalCreateVisible(false);
  };

  const onFinishFailed = (errorInfo: any) => {
  };

  return (
    <>
      <Modal
        title="Thêm tài khoản ngân hàng"
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
              label="Tên ngân hàng:"
              name="bankName"
              rules={[
                { required: true, message: 'Nhập tên ngân hàng!' },
                {
                  max: 100,
                  message: 'Tên ngân hàng không vượt quá 100 ký tự!',
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Chủ tài khoản :"
              name="username"
              rules={[
                { required: true, message: 'Nhập tên chủ tài khoản!' },
                {
                  max: 100,
                  message: 'Tên chủ tài khoản không vượt quá 100 ký tự!',
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Số tài khoản:"
              name="numberAccount"
              rules={[
                { required: true, message: 'Nhập số tài khoản!' },
                {
                  max: 50,
                  pattern: new RegExp(/^[0-9 ]+$/),
                  message:
                    'Số tài khoản chỉ bao gồm số và không vượt quá 50 ký tự!',
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Chi nhánh:"
              name="branch"
              rules={[
                { required: true, message: 'Nhập tên chi nhánh!' },
                {
                  max: 150,
                  message: 'Tên chi nhánh không vượt quá 150 ký tự!',
                },
              ]}
            >
              <Input />
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
        </Form>
      </Modal>
    </>
  );
};

export default BankAccountCreate;
