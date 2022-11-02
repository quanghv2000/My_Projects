import React from 'react';
import TimelineSeparator from '@material-ui/lab/TimelineSeparator';
import TimelineConnector from '@material-ui/lab/TimelineConnector';
import TimelineDot from '@material-ui/lab/TimelineDot';

import style from './style.module.scss';

type IProps = {
  hiddenConnector: boolean;
};

export const ResumeTimelineSeparator: React.FC<any> = (props: IProps) => {
  const { hiddenConnector } = props;

  return (
    <TimelineSeparator className={style['separator_padding']}>
      <TimelineDot variant="outlined" className={style['timeline_dot']} />
      {!hiddenConnector && <TimelineConnector style={{ paddingTop: 18 }} />}
    </TimelineSeparator>
  );
};
