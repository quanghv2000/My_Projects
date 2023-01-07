import React, { useState, useEffect } from 'react';
import { Modal, Form, Input, Upload, message, Button, InputNumber } from 'antd';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { RootState } from 'types/RootState';
import {
  getDataPostingCostRequest,
  createDataPostingCostRequest,
} from 'app/pages/admin/admin-posting-cost-management-page/screen/action';
import { convertPrice } from 'helper/convert-price-to-vnd';

const PostingCostCreate = (props) => {
  const dispatch = useDispatch();
  const state = useSelector(
    (state: RootState) => state?.adminPostingCostPageReducer
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
      dispatch(getDataPostingCostRequest(''));
      success();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  const onFinish = () => {
    const body: any = {
      id: props?.data?.id,
      type: form?.getFieldValue('type'),
      price: form?.getFieldValue('price'),
    };
    dispatch(createDataPostingCostRequest(body));
  };

  const handleCancel = () => {
    form.resetFields();
    props.setIsModalCreateVisible(false);
  };

  const onFinishFailed = (errorInfo: any) => {
  };

  return (
    <>
      <Modal
        title="Thêm loại tin"
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
              label="Loại tin:"
              name="type"
              rules={[
                { required: true, message: 'Nhập tên loại tin!' },
                {
                  max: 100,
                  message: 'Tên loại tin không vượt quá 100 ký tự!',
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Chi phí đăng tin"
              name="price"
              rules={[
                { required: true, message: 'Nhập chi phí đăng tin (> 1.000)' },
              ]}
            >
              <InputNumber
                style={{ width: '100%' }}
                placeholder="Số tiền"
                // type="number"
                formatter={(value) => convertPrice(value)}
                addonAfter="VND"
                min={1000}
              />
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

export default PostingCostCreate;
