import React from 'react';
import { Modal } from 'antd';

type IProps = {
  isOpen: boolean;
  close: () => void;
};

export const AddCategoryModal: React.FC<IProps> = (props: IProps) => {
  /** @Props_Value */
  const { isOpen, close } = props;
  // const [confirmLoading, setConfirmLoading] = useState(false);
  // const [modalText, setModalText] = useState('Content of the modal');

  // const showModal = () => {
  //   setOpenModal(true);
  // };

  // const handleOk = () => {
  //   setModalText('The modal will be closed after two seconds');
  //   setConfirmLoading(true);
  //   setTimeout(() => {
  //     setOpenModal(false);
  //     setConfirmLoading(false);
  //   }, 2000);
  // };

  // const handleCancel = () => {
  //   console.log('Clicked cancel button');
  //   setOpenModal(false);
  // };

  return (
    <>
      <Modal
        title="Title"
        open={isOpen}
        // onOk={handleOk}
        // confirmLoading={confirmLoading}
        onCancel={close}
      >
        <p>{'Tạo danh mục'}</p>
      </Modal>
    </>
  );
};
