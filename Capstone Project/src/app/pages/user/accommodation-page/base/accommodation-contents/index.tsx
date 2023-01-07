import { AimOutlined, HeartFilled, HeartOutlined } from '@ant-design/icons';
import { Carousel, Image, Rate, Row, Typography } from 'antd';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './style.scss';

export interface AccommodationContentProps {
  marginTop?: number;
  accommodationName: string;
  acoommodationLocation: string;
  accommodationDescription?: string;
  accommodationPrice: string;
  accommodationRate?: number;
}

export default function AccommodationContent({
  marginTop,
  accommodationName,
  acoommodationLocation,
  accommodationDescription,
  accommodationPrice,
  accommodationRate,
}: AccommodationContentProps) {
  const { Title, Text } = Typography;
  const [visible, setVisible] = useState(false);
  const [fillIcon, setFillIcon] = useState(true);

  const propsCarousel = {
    dots: true,
    infinite: true,
    speed: 50000,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const onClickFillIcon = () => {
    setFillIcon(!fillIcon);
  };

  useEffect(() => {
  }, [fillIcon]);

  const onChangeCarousel = (e: any) => {
  };

  return (
    <Row
      className="accommodationContent-container"
      style={{ marginTop: `${marginTop}px` }}
    >
      <Row className="accommodaion-items">
        <Row className="AddToFavourite-Accommodation" onClick={onClickFillIcon}>
          {fillIcon ? (
            <HeartOutlined className="add-icon" />
          ) : (
            <HeartFilled className="add-icon" />
          )}
        </Row>
        <Row className="items-images">
          <Carousel
            autoplay
            dotPosition="bottom"
            afterChange={onChangeCarousel}
            {...propsCarousel}
          >
            <Image
              width={200}
              src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
              preview={{ visible: false }}
              onClick={() => setVisible(true)}
            />
          </Carousel>
        </Row>
        <Row className="items-data">
          <Row className="items-data__title">
            <Link to="/rooms/:id">
              <Title level={2} type="secondary">
                {accommodationName}
              </Title>
            </Link>
          </Row>
          <Row className="items-data__location">
            <AimOutlined /> &nbsp; {acoommodationLocation}
          </Row>
          <Row className="items-data__details">{accommodationDescription}</Row>
          <Row className="items-data__rate">
            <Row className="money__rate">{accommodationPrice}</Row>
            <Row className="rating">
              <Rate disabled defaultValue={accommodationRate} />
            </Row>
          </Row>
          <Row className="items-data__availableRoom">
            <Text>Còn `totalAvailableRoom` phòng</Text>
          </Row>
        </Row>
      </Row>

      <div style={{ display: 'none' }}>
        <Image.PreviewGroup
          preview={{ visible, onVisibleChange: (vis) => setVisible(vis) }}
        >
          <Image src="https://gw.alipayobjects.com/zos/antfincdn/LlvErxo8H9/photo-1503185912284-5271ff81b9a8.webp" />
          <Image src="https://gw.alipayobjects.com/zos/antfincdn/cV16ZqzMjW/photo-1473091540282-9b846e7965e3.webp" />
          <Image src="https://gw.alipayobjects.com/zos/antfincdn/x43I27A55%26/photo-1438109491414-7198515b166b.webp" />
        </Image.PreviewGroup>
      </div>
    </Row>
  );
}
