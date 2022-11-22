import React from 'react';
import Moment from 'react-moment';

type IProps = {
  date: Date;
};

export const ColumnDate: React.FC<IProps> = ({ date }) => {
  return <Moment format="DD-MM-YYYY HH:mm:ss">{date}</Moment>;
};
