import { Input } from 'antd';
import React, { FC } from 'react';

export const TextInput: FC<{
  field: any;
  form: any;
  props: any;
  onChange?: any;
  onBlur?: any;
}> = ({ field, form, ...props }) => {
  const { onChange, onBlur } = props as any;
  const handleChange = (e: any) => {
    const { value } = e.target;
    if (!onChange) {
      form.setFieldValue(field.name, value);
    } else {
      onChange(e);
    }
  };

  const handleBlur = (e: any) => {
    const { value } = e.target;
    if (!onBlur) {
      form.handleBlur(e);
      form.setFieldValue(field.name, value.trim());
    } else {
      onBlur(e);
    }
  };

  return (
    <Input
      maxLength="256"
      {...field}
      {...props}
      onChange={handleChange}
      onBlur={handleBlur}
      value={form.values[field.name]}
    />
  );
};
