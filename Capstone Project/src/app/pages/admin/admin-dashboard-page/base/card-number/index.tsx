import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'antd';
import CountUp from 'react-countup';
import iconMap from 'utils/iconMap';
import './style.scss';

function NumberCard({ icon, color, title, number, countUp }) {
  return (
    <Card
      style={{ borderRadius: 12 }}
      className={'numberCard'}
      bordered={true}
      bodyStyle={{ padding: 10 }}
    >
      <span className={'iconWarp'} style={{ color }}>
        {iconMap[icon]}
      </span>
      <div className={'content'}>
        <p className={'title'}>{title || 'No Title'}</p>
        <p className={'number'}>
          <CountUp
            start={0}
            end={number}
            duration={2.75}
            useEasing
            useGrouping
            separator=","
            {...(countUp || {})}
          />
        </p>
      </div>
    </Card>
  );
}

NumberCard.propTypes = {
  icon: PropTypes.string,
  color: PropTypes.string,
  title: PropTypes.string,
  number: PropTypes.number,
  countUp: PropTypes.object,
};

export default NumberCard;
