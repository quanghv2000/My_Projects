import React from 'react';
import { Input } from 'antd';

import styles from './input-search.module.scss';

const { Search } = Input;

type IProps = {
  id?: string;
  placeholder?: string;
  className?: string;
  loading?: boolean;
  style?: object;
  onSearch?: (value: string) => void;
};

export const AppInputSearch: React.FC<IProps> = (props: IProps) => {
  let { id, placeholder, className, loading, style, onSearch } = props;
  return (
    <Search
      id={id}
      placeholder={placeholder}
      loading={loading}
      className={`${className} ${styles.inputSearch}`}
      onSearch={onSearch}
      style={style}
    />
  );
};
