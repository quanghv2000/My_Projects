import { Col, Row, Slider, Typography, InputNumber } from 'antd';
import React, { useEffect, useState } from 'react';
import './style.scss';

export interface BudgetFilterProps {
  width?: any;
}

export const BudgetFilter = ({ width }: BudgetFilterProps) => {
  const { Text } = Typography;

  const [budget, setBudget] = useState({
    minValue: 0,
    maxValue: 500000,
  });

  const onHandleBudgetChange = (e: any) => {
    setBudget({ minValue: e[0], maxValue: e[1] });
  };

  return (
    <Row className="budget-filter__container" style={{ width: `${width}px` }}>
      <Row className="budget-filter__wrap">
        <Col span={24}>
          <Slider
            range
            // defaultValue={[0, 1000000]}
            defaultValue={[budget.minValue, budget.maxValue]}
            value={[budget.minValue, budget.maxValue]}
            step={100000}
            max={5000000}
            onChange={(e) => onHandleBudgetChange(e)}
            marks={{
              0: '0',
              2000000: '2.000.000',
              4000000: '4.000.000',
            }}
          />
        </Col>
        <Row className="budget-filter__input">
          <Row className="budget__min-price budget-price">
            <Text className="budget-title">Giá thấp nhất</Text>
            <InputNumber
              className="budget-number"
              value={budget.minValue}
              min={0}
              max={5000000}
              step={100000}
              addonAfter="VND"
              onChange={(value) =>
                setBudget({
                  ...budget,
                  minValue: value,
                })
              }
            />
          </Row>
          <Row className="budget__max-price budget-price">
            <Text className="budget-title">Giá cao nhất</Text>
            <InputNumber
              className="budget-number"
              value={budget.maxValue}
              min={0}
              max={5000000}
              step={100000}
              addonAfter="VND"
              onChange={(value) =>
                setBudget({
                  ...budget,
                  maxValue: value,
                })
              }
            />
          </Row>
        </Row>
      </Row>
    </Row>
  );
};
