import React, { useState, useEffect } from 'react';
import { Modal, Form, Input, Upload, message, Button } from 'antd';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { RootState } from 'types/RootState';
import {
  getDataRoomTypeRequest,
  createDataRoomTypeRequest,
} from 'app/pages/admin/admin-room-type-management-page/screen/action';

const RoomTypeCreate = (props) => {
  const dispatch = useDispatch();
  const state = useSelector(
    (state: RootState) => state?.adminRoomTypePageReducer
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
      dispatch(getDataRoomTypeRequest(''));
      success();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  const onFinish = () => {
    const body: any = {
      id: props?.data?.id,
      name: form?.getFieldValue('name'),
      description: form?.getFieldValue('description'),
    };
    dispatch(createDataRoomTypeRequest(body));
  };

  const handleCancel = () => {
    form.resetFields();
    props.setIsModalCreateVisible(false);
  };

  const onFinishFailed = (errorInfo: any) => {};

  return (
    <>
      <Modal
        title="Thêm loại phòng"
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
          <div
            style={{
              paddingTop: '20px',
              paddingRight: '50px',
              // paddingLeft: '45px',
            }}
          >
            <Form.Item
              label="Tên loại phòng:"
              name="name"
              rules={[
                { required: true, message: 'Nhập tên loại phòng!' },
                {
                  max: 100,
                  message: 'Tên loại phòng không vượt quá 100 ký tự!',
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
        </Form>
      </Modal>
    </>
  );
};

export default RoomTypeCreate;
