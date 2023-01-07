import { Row, Checkbox } from 'antd';
import React from 'react';
import './style.scss';

export interface HalfCheckboxFilterProps {
  checkboxName: string;
  width?: any;

  onChange: (value: any) => void;
}

export const HalfCheckboxFilter = ({
  checkboxName,
  width,
  onChange,
}: HalfCheckboxFilterProps) => {
  return (
    <Row className="halfcheckbox-filter__wrap" style={{ width: `${width}px` }}>
      <Checkbox onChange={onChange} className="halfcheckbox-style">
        {checkboxName}
      </Checkbox>
    </Row>
  );
};
