import React, { useState, useEffect } from 'react';
import { Modal, Form, Input, message, Upload, Button } from 'antd';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { RootState } from 'types/RootState';
import {
  updateDataRoomCategoriesRequest,
  getDataRoomCategoriesRequest,
} from 'app/pages/admin/admin-room-category-management-page/screen/action';
import { PlusOutlined } from '@ant-design/icons';
import { getBase64, getFile } from 'helper/handle-upload';
import { DEFAULT_APP_UPLOAD_CLOUNDIANRY } from 'utils/config';

const RoomCategoryUpdate = (props) => {
  const dispatch = useDispatch();
  // const [fileList, setFileList]: any = useState([]);

  const [fileImage, setFileImage]: any = useState([]);
  const [fileIcon, setFileIcon]: any = useState([]);

  const [previewImageVisible, setPreviewImageVisible] = useState(false);
  const [previewImageTitle, setPreviewImageTitle] = useState('');
  const [previewImage, setPreviewImage]: any = useState('');

  const [previewIconVisible, setPreviewIconVisible] = useState(false);
  const [previewIconTitle, setPreviewIconTitle] = useState('');
  const [previewIcon, setPreviewIcon]: any = useState('');

  const state = useSelector(
    (state: RootState) => state?.adminRoomCategoryPageReducer
  );

  const handleCancel = () => {
    props.setIsModalUpdateVisible(false);
  };

  const handleChangeUploadImage: any = ({ fileList }) => {
    setFileImage(fileList);
  };

  const handleChangeUploadIcon: any = ({ fileList }) => {
    setFileIcon(fileList);
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
      dispatch(getDataRoomCategoriesRequest(''));
      success();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  const passDataFromProps = () => {
    const image: any = {
      uid: '-1',
      name: props?.data?.name,
      url: props?.data?.imageUrl,
      status: 'done',
    };
    const icon: any = {
      uid: '-1',
      name: props?.data?.name,
      url: props?.data?.icon,
      status: 'done',
    };

    let imageList: any = [];
    let iconList: any = [];
    imageList.push(image);
    iconList.push(icon);
    setFileImage(imageList);
    setFileIcon(iconList);

    setPreviewImageTitle(props?.data?.name);
    form.setFieldsValue({
      name: props?.data?.name,
      description: props?.data?.description,
      image: props?.data?.imageUrl,
      icon: props?.data?.icon,
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
    const formDataImage = new FormData();
    const formDataIcon = new FormData();
    let imageUrl: any = fileImage[0].url;
    let iconUrl: any = fileIcon[0].url;

    if (fileImage[0].uid !== '-1') {
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
      imageUrl = JSON.parse(imageUrlUploaded)?.url;
    }

    if (fileIcon[0].uid !== '-1') {
      formDataIcon.append('file', fileIcon[0]?.originFileObj);
      formDataIcon.append('upload_preset', 'ml_default');

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
      iconUrl = JSON.parse(iconUrlUploaded)?.url;
    }

    const body: any = {
      id: props?.data?.id,
      name: form?.getFieldValue('name'),
      description: form?.getFieldValue('description'),
      imageUrl: imageUrl,
      icon: iconUrl,
    };
    dispatch(updateDataRoomCategoriesRequest(body));
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

  const onFinishFailed = (er) => {
  };

  return (
    <>
      <Modal
        title="Chỉnh sửa danh mục phòng"
        visible={props.isModalUpdateVisible}
        footer={null}
        onCancel={handleCancel}
        confirmLoading={state?.loadingBtnUpdate}
        width="750px"
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
              label="Tên danh mục phòng:"
              name="name"
              rules={[
                { required: true, message: 'Nhập tên danh mục phòng!' },
                {
                  max: 100,
                  message: 'Tên danh mục phòng không vượt quá 100 ký tự!',
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
      </Modal>
    </>
  );
};

export default RoomCategoryUpdate;
