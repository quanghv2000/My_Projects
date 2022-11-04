import React from 'react';

import styles from './contact.module.css';

type IProps = {};

export const ContactPage: React.FC<IProps> = () => {
  return (
    <div className={styles.contact}>
      <div className="section_title mb_30">
        <span></span>
        <h6 className="section_title_text">Contact</h6>
      </div>
    </div>
  );
};
