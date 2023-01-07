import React, { Fragment, useEffect, useState } from 'react';
import { Row, Button, Modal } from 'antd';
import 'app/pages/user/detail-room-page/base/amenities/style.scss';
import { DEFAULT_GOOGLE_MAP_API_KEY } from 'utils/config';
import { useSelector } from 'react-redux';
import { RootState } from 'types/RootState';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { HouseMapModal } from 'app/pages/user/detail-room-page/base/house-map-modal';

export const HouseMap: React.FC<any> = (props: any) => {
  const containerStyle = {
    width: '100%',
    height: '100%',
  };

  const state = useSelector(
    (state: RootState) => state?.detailRoomReducer?.dataResponse
  );

  const [isModalMapVisible, setIsModalMapVisible] = useState(false);
  const [position, setPosition]: any = useState({
    lat: 21.01351,
    lng: 105.527096,
  });

  const handleCancel = () => {
    setIsModalMapVisible(false);
  };

  useEffect(() => {
    if (state?.post?.house?.address) {
      setPosition({
        lat: parseFloat(state?.post?.house?.address?.latitude),
        lng: parseFloat(state?.post?.house?.address?.longiude),
      });
    }
  }, [state?.post?.house?.address]);
  return (
    <Fragment>
      {state?.post?.house?.address ? (
        <>
          <div>
            <p className="amenities__title">Địa chỉ</p>
            <p className="amenities__sub--title">
              <Button
                type="primary"
                className="mt-10"
                onClick={() => setIsModalMapVisible(true)}
              >
                Đường đi đến địa điểm này
              </Button>
            </p>
          </div>

          <Row
            className="amenities__row"
            style={{ width: ' 100%', height: 400 }}
          >
            <LoadScript
              googleMapsApiKey={DEFAULT_GOOGLE_MAP_API_KEY}
              libraries={['places']}
              key="room"
            >
              <GoogleMap
                mapContainerStyle={containerStyle}
                center={position}
                zoom={15}
                key="room"
                clickableIcons={false}
              >
                <Marker position={position} title="longggg"/>
              </GoogleMap>
            </LoadScript>
          </Row>
        </>
      ) : (
        ''
      )}
      <Modal
        cancelText="Đóng"
        style={{ top: 20, }}
        title={`${state?.post?.house?.name} - ${state?.post?.house?.typeOfRental?.name}`}
        width={'100%'}
        okButtonProps={{ style: { display: 'none' } }}
        visible={isModalMapVisible}
        onCancel={handleCancel}
      >
        <HouseMapModal />
      </Modal>
    </Fragment>
  );
};
