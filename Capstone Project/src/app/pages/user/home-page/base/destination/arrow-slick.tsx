import React from 'react';

interface ArrowProps {
  className?: any;
  style?: any;
  onClick?: any;
}

export const ArrowPrev: React.FC<ArrowProps> = ({
  style,
  className,
  onClick,
}) => (
  <div
    style={{
      ...style,
      backgroundColor: 'white',
      zIndex: 10,
      height: 50,
      width: 30,
      borderRadius: 5,
      top: '150px',
      position: 'absolute',
      boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
      left: '-10px',
    }}
    onClick={onClick}
    className={className}
  >
    <img
      src={`https://res.cloudinary.com/longbody/image/upload/v1646810056/shopsale/arrow_left-512_ltcdlv.webp`}
      style={{ height: 20, position: 'absolute', left: 5, top: 15 }}
      alt="arrow_left"
    />
  </div>
);

export const ArrowNext: React.FC<ArrowProps> = ({
  style,
  className,
  onClick,
}) => (
  <div
    style={{
      ...style,
      backgroundColor: 'white',
      zIndex: 10,
      height: 50,
      width: 30,
      borderRadius: 5,
      position: 'absolute',
      boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
      top: '150px',
      right: '-10px',
    }}
    onClick={onClick}
    className={className}
  >
    <img
      src={`https://res.cloudinary.com/longbody/image/upload/v1646810056/shopsale/arrow_right-512_qzua1r.webp`}
      style={{ height: 20, position: 'absolute', left: 6 }}
      alt="arrow_left"
      onClick={onClick}
      className={className}
    />
  </div>
);
