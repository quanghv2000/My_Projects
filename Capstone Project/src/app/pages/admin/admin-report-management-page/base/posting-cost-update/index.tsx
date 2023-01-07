import React, { useState, useEffect } from 'react';
import { Modal, Form, Input, message, Button, InputNumber } from 'antd';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { RootState } from 'types/RootState';
import {
  updateDataPostingCostRequest,
  getDataPostingCostRequest,
} from 'app/pages/admin/admin-posting-cost-management-page/screen/action';
import { convertPrice } from 'helper/convert-price-to-vnd';

const PostingCostUpdate = (props) => {
  const dispatch = useDispatch();
  const state = useSelector(
    (state: RootState) => state?.adminPostingCostPageReducer
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
      dispatch(getDataPostingCostRequest(''));
      success();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  const passDataFromProps = () => {
    form.setFieldsValue({
      type: props?.data?.type,
      price: props?.data?.price,
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
      type: form?.getFieldValue('type'),
      price: form?.getFieldValue('price'),
    };
    dispatch(updateDataPostingCostRequest(body));
  };

  const onFinishFailed = (err) => {
  };

  return (
    <>
      <Modal
        title="Chỉnh sửa loại tin"
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
              label="Loại tin:"
              name="type"
              rules={[
                { required: true, message: 'Nhập loại tin!' },
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

export default PostingCostUpdate;
