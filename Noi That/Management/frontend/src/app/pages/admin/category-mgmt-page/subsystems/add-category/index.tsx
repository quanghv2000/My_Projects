import React from 'react';
import { Button, Form, Input, Modal } from 'antd';

import styles from './style.module.scss';

type IProps = {
  isOpenModal: boolean;
  closeModal: () => void;
};

export const AddCategoryModal: React.FC<IProps> = (props: IProps) => {
  /** @Props_Value */
  const { isOpenModal, closeModal } = props;

  /** @Form_Manager */
  const [form] = Form.useForm();

  /** @Submit_Handler */
  const onFinish = () => {
    console.log('Success:', form);
    closeModal();
  };

  return (
    <>
      <Modal
        title="Tạo danh mục mới"
        className={styles.modal}
        open={isOpenModal}
        footer={null}
        onCancel={closeModal}
      >
        <Form
          form={form}
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 18 }}
          onFinish={onFinish}
        >
          <div className={styles.modalBody}>
            <Form.Item
              label="Tên danh mục"
              name="name"
              rules={[{ required: true, message: 'Nhập tên danh mục!' }]}
            >
              <Input />
            </Form.Item>
          </div>
          <div className={styles.modalFooter}>
            <Button className="mr-8" onClick={closeModal}>
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
