import React from 'react';
import { ContactForm, ContactInfo } from './components';

import styles from './contact.module.css';

type IProps = {};

export const ContactPage: React.FC<IProps> = () => {
  return (
    <div className={styles.contact}>
      <div className="row">
        <div className="col-xl-6 col-lg-12">
          <ContactForm />
        </div>
        <div className="col-xl-6 col-lg-12">
          <ContactInfo />
        </div>
      </div>
    </div>
  );
};
