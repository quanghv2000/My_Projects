import React from 'react';
import './style.scss';

export const InputSearch: React.FC<any> = () => {
  return (
    <div className="input-group">
      <input
        type="text"
        className="form-control"
        placeholder="Tìm kiếm trên Hola Market"
      />
      <div className="input-group-append">
        <span className="input-group-text" id="basic-addon2">
          <i className="fa fa-search" style={{ fontSize: 20 }}></i>
        </span>
      </div>
    </div>
  );
};
