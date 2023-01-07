import { Row, Checkbox } from 'antd';
import React from 'react';
import './style.scss';

export interface CheckBoxFilterProps {
  checkboxName: string;
  width?: any;

  onChange: (value: any) => void;
}

export const CheckBoxFilter = ({
  checkboxName,
  width,
  onChange,
}: CheckBoxFilterProps) => {
  return (
    <Row className="checkbox-filter__wrap" style={{ width: `${width}px` }}>
      <Checkbox onChange={onChange} className="checkbox-style">
        {checkboxName}
      </Checkbox>
    </Row>
  );
};
