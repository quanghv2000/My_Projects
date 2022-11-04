import { Button } from 'app/components';
import React from 'react';

type IProps = {};

export const ContactForm: React.FC<IProps> = () => {
  return (
    <>
      <div className="section_title mb_20">
        <span></span>
        <h6 className="section_title_text">Contact Form</h6>
      </div>
      <form>
        <div>
          <input name="name"></input>
        </div>
        <div>
          <input name="email"></input>
        </div>
        <div>
          <input name="message"></input>
        </div>
        <div className="mt-20">
          <Button
            text="Submit"
            icon={<i className="fa-solid fa-paper-plane"></i>}
          />
        </div>
      </form>
    </>
  );
};
