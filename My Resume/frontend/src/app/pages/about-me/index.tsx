import React from 'react';

import styles from './about-me.module.css';

type IProps = {};

export const AboutMePage: React.FC<IProps> = () => {
  return (
    <div className={styles.aboutMe}>
      <div className="section_title mb_30">
        <span></span>
        <h6 className="section_title_text">About Me</h6>
      </div>
      <div>
        <p>
          The “about us” page is a must-have page (this can be a page on your
          website, separate landing page or even “about me” website as a type of
          portfolio) used by all types of businesses to give customers more
          insight into who is involved with a given business and exactly what it
          does.
        </p>
        <br />
        <p>
          Your “About me” page forms the first impression of a company or
          product, puts a name and a face to your business, and gives website
          visitor the opportunity to develop a connection with you(a good reason
          for a visitor to stay on your website!), and it is your best chance to
          convert more visits to enquiries/ more enquiries to customers.
        </p>
      </div>
    </div>
  );
};
