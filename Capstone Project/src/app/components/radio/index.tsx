import React, { memo } from 'react';
import { Props } from 'app/components/radio/types';
import { Wrapper } from 'app/components/radio/styled';

export const Radio: React.FC<any> = memo(
  ({ id, label, className, isSelected, ...restOf }: Props) => {
    return (
      <Wrapper className={className}>
        <input type="radio" id={id} checked={isSelected} {...restOf} />
        <label htmlFor={id}>{label}</label>
      </Wrapper>
    );
  },
);
