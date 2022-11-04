import { Button } from 'app/components';
import React from 'react';

type IProps = {};

export const ContactForm: React.FC<IProps> = () => {
  return (
    <>
      <div className="section_title mb_30">
        <span></span>
        <h6 className="section_title_text">Contact Form</h6>
      </div>
      <form className="mt-25">
        <div className="row">
          <div className="col-sm-6 col-12">
            <div className="mb-3">
              <span className="formRequired">*</span>
              <label className="form-label">Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter your name"
                required={true}
              />
              {/* <div className="form-text">
                We'll never share your email with anyone else.
              </div> */}
            </div>
          </div>
          <div className="col-sm-6 col-12">
            <div className="mb-3">
              <span className="formRequired">*</span>
              <label className="form-label">Email address</label>
              <input
                type="email"
                className="form-control"
                placeholder="Enter your email"
                required={true}
              />
            </div>
          </div>
          <div className="col-12">
            <div className="mb-3">
              <span className="formRequired">*</span>
              <label className="form-label">Message</label>
              <textarea
                className="form-control"
                placeholder="Enter message"
                rows={3}
                required={true}
              ></textarea>
            </div>
          </div>
        </div>

        <div className="mt-20">
          <Button
            type="submit"
            text="Submit"
            icon={<i className="fa-solid fa-paper-plane"></i>}
            onClick={e => {
              alert('??????');
              e.preventDefault();
            }}
          />
        </div>
      </form>
    </>
  );
};
