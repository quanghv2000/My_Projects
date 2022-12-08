import React from 'react';

export const Captcha: React.FC = () => (
  <>
    <label className="mb-2">Captcha</label>
    <div className="row d-flex align-items-center">
      <div className="form-group col-5">
        <input type="text" className="form-control" disabled value="7 C  &   5  H O   3" />
      </div>
      <div className="col-2">
        <i className="fa fa-sync-alt" style={{ fontSize: 30, color: '#17A2B8', cursor: 'pointer' }} />
      </div>
      <div className="form-group col-5">
        <input type="text" className="form-control" placeholder="Enter captcha" />
      </div>
    </div>
  </>
);
