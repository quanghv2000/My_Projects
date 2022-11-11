import React from 'react';
import { ContactForm, ContactInfo } from './components';

import styles from './contact.module.css';

type IProps = {};

export const ContactPage: React.FC<IProps> = () => {
  return (
    <div className={styles.contact}>
      <div className="row" style={{ margin: '-30px' }}>
        <div className="col-xl-7 col-lg-12 m-0 p-30">
          <ContactForm />
        </div>
        <div className="col-xl-5 col-lg-12 m-0 p-30">
          <ContactInfo />
        </div>
      </div>
    </div>
  );
};
