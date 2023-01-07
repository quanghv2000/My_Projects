import React, { useState, useEffect } from 'react';
import { Modal, Form, Input, Upload, message, Button } from 'antd';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { RootState } from 'types/RootState';
import { PlusOutlined } from '@ant-design/icons';
import { getBase64, getFile } from 'helper/handle-upload';
import { DEFAULT_APP_UPLOAD_CLOUNDIANRY } from 'utils/config';
import {
  getDataAmenityRequest,
  createDataAmenityRequest,
} from 'app/pages/admin/admin-amenity-management-page/screen/action';
import { Select } from 'antd';

const { Option } = Select;

const AmenityCreate = (props) => {
  const dispatch = useDispatch();
  const [fileList, setFileList]: any = useState([]);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewTitle, setPreviewTitle] = useState('');
  const [previewImage, setPreviewImage]: any = useState('');
  const [amenityType, setAmenityType] = useState('house');

  const handleChange = (value) => {
    setAmenityType(value);
  };

  const state = useSelector(
    (state: RootState) => state?.adminAmenityPageReducer
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
      setFileList([]);
      dispatch(getDataAmenityRequest(''));
      success();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  const handleChangeUpload: any = (fileLists: any) => {
    setFileList(fileLists.fileList);
  };

  const onFinish = () => {
    const url = DEFAULT_APP_UPLOAD_CLOUNDIANRY;
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
          const body: any = {
            id: props?.data?.id,
            name: form?.getFieldValue('name'),
            type: amenityType,
            icon: JSON.parse(data)?.url
              ? JSON.parse(data)?.url
              : form?.getFieldValue('image'),
          };
          dispatch(createDataAmenityRequest(body));
        });
    }
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

  const handleCancel = () => {
    form.resetFields();
    setFileList([]);
    props.setIsModalCreateVisible(false);
  };

  const onFinishFailed = (errorInfo: any) => {
  };

  return (
    <>
      <Modal
        title="Thêm tiện nghi"
        visible={props.isModalCreateVisible}
        confirmLoading={state?.loadingBtnCreate}
        footer={null}
        onCancel={handleCancel}
        width="800px"
      >
        <Form
          name="basic"
          labelCol={{ span: 6 }}
          form={form}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <div
            style={{
              paddingTop: '20px',
              paddingRight: '65px',
              paddingLeft: '45px',
            }}
          >
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
                defaultValue={amenityType}
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
                maxCount={1}
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
            visible={previewVisible}
            title={previewTitle}
            footer={null}
            onCancel={() => setPreviewVisible(false)}
          >
            <img alt="example" style={{ width: '100%' }} src={previewImage} />
          </Modal>
        </Form>
      </Modal>
    </>
  );
};

export default AmenityCreate;
