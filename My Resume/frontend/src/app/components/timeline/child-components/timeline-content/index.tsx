import React from 'react';

import styles from './timeline-content.module.css';

type IProps = {
  info?: {
    title?: string;
    value?: string;
  };
  titleHeader?: JSX.Element | string;
  titleDot?: JSX.Element | string;
  timelinePeriod?: JSX.Element | string;
  description?: JSX.Element | string;
};

export const TimelineContent: React.FC<IProps> = (props: IProps) => {
  /** @Props_Value */
  const { info, titleHeader, titleDot, timelinePeriod, description } = props;

  return (
    <div className={styles.timelineContent}>
      {titleHeader && (
        <div
          className={styles.titleHeader}
          style={{
            fontSize: 20,
            color: '#212529',
            fontWeight: 'bold',
            marginTop: 6,
            marginLeft: 16,
          }}
        >
          {titleHeader}
        </div>
      )}
      {titleDot && (
        <div
          className={styles.titleDot}
          style={{
            fontSize: 16,
            color: '#212529',
            fontWeight: 'bold',
            marginTop: -10,
          }}
        >
          {titleDot}
        </div>
      )}
      {timelinePeriod && (
        <p
          className={styles.timelinePeriod}
          style={{
            fontSize: '0.85rem',
            color: 'gray',
            fontWeight: 600,
            margin: 0,
            padding: 0,
            marginBottom: 5,
          }}
        >
          {timelinePeriod}
        </p>
      )}
      {description && (
        <span
          className={styles.description}
          style={{ color: '#808080', fontSize: '14px' }}
        >
          {description}
        </span>
      )}
      {info && (
        <div className={styles.info}>
          <p style={{ color: '#272829', fontSize: '0.875rem', marginTop: -8 }}>
            <span style={{ fontWeight: 'bold' }}>{info?.title}: </span>
            <span>{info?.value}</span>
          </p>
        </div>
      )}
    </div>
  );
};
