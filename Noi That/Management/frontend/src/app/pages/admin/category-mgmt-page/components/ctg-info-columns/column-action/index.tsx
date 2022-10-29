import React from 'react';
import { AppButton } from 'app/components';
import { ICategoryInfo } from 'models/api-model/response';

type IProps = {
  record: ICategoryInfo;
};

export const ColumnAction: React.FC<IProps> = (props: IProps) => {
  return (
    <div className="d-flex">
      <span>
        <AppButton isBtnTag type="update" text="Sửa" />
      </span>
      <span className="ml-16">
        <AppButton isBtnTag type="delete" text="Xóa" />
      </span>
    </div>
  );
};
