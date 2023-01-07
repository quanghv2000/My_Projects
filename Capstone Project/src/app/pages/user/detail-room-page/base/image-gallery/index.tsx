import { Button, Col, Row } from 'antd';
import 'app/pages/user/detail-room-page/base/image-gallery/style.scss';
import React, { Fragment, useState } from 'react';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import { useSelector } from 'react-redux';
import { RootState } from 'types/RootState';

export const ImageGallerys: React.FC<any> = () => {
  const [imagePreview, setImagePreview] = useState([]);
  const [photoIndex, setPhotoIndex] = useState(0);
  const [isOpen, setOpen] = useState(false);

  const state = useSelector(
    (state: RootState) => state?.detailRoomReducer?.dataResponse?.post?.room
  );

  const imageList = state?.images?.length > 0 ? state?.images : [];

  let imageComp: any = '';

  if (state?.images?.length < 5) {
    imageComp = imageList?.map((item: any, key: any) => {
      return (
        <Col xs={24} xl={6} key={key}>
          <img
            style={{ height: 200, marginRight: 10, padding: 5 }}
            src={item?.imageUrl}
          />
        </Col>
      );
    });
  } else {
    const imageViewModal: any = [];

    imageList?.map((item: any) => {
      imageViewModal.push(item?.imageUrl);
    });

    imageComp = (
      <div className="image__gallery__container">
        <div className="image__gallery__container--left">
          <img
            className="image__gallery__container--left__image image__hover"
            alt="imageGallery"
            src={imageList[0]?.imageUrl}
          />
        </div>
        <div className="image__gallery__container--right">
          <div className="image__gallery__container--right--top">
            <div className="image__gallery__container--right--top--item">
              <img
                className="image__gallery__container--right--top__image image__hover "
                alt="imageGallery"
                src={imageList[1]?.imageUrl}
              />
            </div>
            <div className="image__gallery__container--right--top--item ">
              <img
                className="image__gallery__container--right--top__image image-top-radius image__hover "
                alt="imageGallery"
                src={imageList[2]?.imageUrl}
              />
            </div>
          </div>

          <div className="image__gallery__container--right--bottom">
            <div className="image__gallery__container--right--bottom--item">
              <img
                className="image__gallery__container--right--bottom__image image__hover "
                alt="imageGallery"
                src={imageList[3]?.imageUrl}
              />
            </div>
            <div
              className="image__gallery__container--right--bottom--item"
              style={{ position: 'relative' }}
            >
              <img
                className="image__gallery__container--right--bottom__image image-bottom-radius image__hover "
                alt="imageGallery"
                src={imageList[4]?.imageUrl}
              />
              <Button
                style={{
                  borderRadius: 3,
                  // padding: '7px 15px',
                  borderColor: 'white',
                  background: 'white',
                  position: 'absolute',
                  // color: 'white',
                  bottom: 30,
                  right: 30,
                }}
                onClick={() => {
                  setImagePreview(imageViewModal);
                  setOpen(true);
                }}
              >
                Xem thêm
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <Fragment>
      <Row style={{ marginTop: 40 }}>
        {state?.images?.length > 0 ? imageComp : ''}
      </Row>

      {/* <Modal
        title="Ảnh phòng"
        style={{ top: 20 }}
        visible={modalVisible}
        width={800}
        onOk={() => setModalVisible(false)}
        onCancel={() => setModalVisible(false)}
        footer={null}
      > */}
      {isOpen ? (
        <Lightbox
          mainSrc={imagePreview[photoIndex]}
          nextSrc={imagePreview[(photoIndex + 1) % imagePreview.length]}
          prevSrc={
            imagePreview[
              (photoIndex + imagePreview.length - 1) % imagePreview.length
            ]
          }
          onCloseRequest={() => setOpen(false)}
          onMovePrevRequest={() =>
            setPhotoIndex(
              (photoIndex + imagePreview.length - 1) % imagePreview.length
            )
          }
          onMoveNextRequest={() =>
            setPhotoIndex((photoIndex + 1) % imagePreview.length)
          }
        />
      ) : (
        ''
      )}
      {/* <ImageGallery items={imagePreview} /> */}
      {/* </Modal> */}
    </Fragment>
  );
};
