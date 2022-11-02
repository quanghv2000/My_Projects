import React from 'react';
import { Button, Form, Input, Modal } from 'antd';

import styles from './style.module.scss';
import { Characters } from 'utils/constants';

type IProps = {
  isOpenModal: boolean;
  closeModal: () => void;
};

export const AddCategoryModal: React.FC<IProps> = (props: IProps) => {
  /** @Props_Value */
  const { isOpenModal, closeModal } = props;

  /** @Form_Manager */
  const [form] = Form.useForm();

  /** @Logic_Handler */
  const handleCloseModal = () => {
    form.resetFields();
    closeModal();
  };

  /** @Submit_Handler */
  const onFinish = () => {
    const { name } = form.getFieldsValue();
  };

  const onFinishFailed = () => {
    console.log('Finish failed: ', form);
  };

  return (
    <>
      <Modal
        title="Tạo danh mục mới"
        className="modal-form-custom"
        open={isOpenModal}
        footer={null}
        onCancel={handleCloseModal}
      >
        <Form
          form={form}
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 18 }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <div className={styles.modalBody}>
            <Form.Item
              label="Tên danh mục"
              name="name"
              rules={[
                {
                  required: true,
                  message: 'Nhập tên danh mục!',
                },
                {
                  validator: (_, value) => {
                    if (value && value.startsWith(Characters.SPACE)) {
                      return Promise.reject(
                        'Tên danh mục không được chứa dấu cách đằng trước!',
                      );
                    }

                    return Promise.resolve();
                  },
                },
              ]}
            >
              <Input />
            </Form.Item>
          </div>
          <div className={styles.modalFooter}>
            <Button className="mr-8" onClick={handleCloseModal}>
              Hủy bỏ
            </Button>
            <Button type="primary" htmlType="submit">
              Tạo
            </Button>
          </div>
        </Form>
      </Modal>
    </>
  );
};
