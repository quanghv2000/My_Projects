import React, { useState, useEffect } from 'react';
import { Modal, Form, Input, message, Button } from 'antd';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { RootState } from 'types/RootState';
import {
  updateDataRoomTypeRequest,
  getDataRoomTypeRequest,
} from 'app/pages/admin/admin-room-type-management-page/screen/action';

const RoomTypeUpdate = (props) => {
  const dispatch = useDispatch();
  const state = useSelector(
    (state: RootState) => state?.adminRoomTypePageReducer
  );

  const handleCancel = () => {
    props.setIsModalUpdateVisible(false);
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
      dispatch(getDataRoomTypeRequest(''));
      success();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  const passDataFromProps = () => {
    form.setFieldsValue({
      name: props?.data?.name,
      description: props?.data?.description,
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

  const onFinish = () => {
    const body: any = {
      id: props?.data?.id,
      name: form?.getFieldValue('name'),
      description: form?.getFieldValue('description'),
    };
    dispatch(updateDataRoomTypeRequest(body));
  };

  const onFinishFailed = (err) => {
  };

  return (
    <>
      <Modal
        title="Chỉnh sửa loại phòng"
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
      </Modal>
    </>
  );
};

export default RoomTypeUpdate;
