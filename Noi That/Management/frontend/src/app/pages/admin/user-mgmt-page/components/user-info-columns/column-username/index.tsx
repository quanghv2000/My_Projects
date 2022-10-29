import React from 'react';
import { Link } from 'react-router-dom';
import { Avatar, Image } from 'antd';
import { IUserInfo } from 'models/api-model/response';

type IProps = {
  record: IUserInfo;
};

export const ColumnUsername: React.FC<IProps> = (props: IProps) => {
  const { id, username } = props.record;
  return (
    <>
      <Avatar
        src={
          <Image
            src="https://joeschmoe.io/api/v1/random"
            style={{ width: 32 }}
          />
        }
      />
      <Link
        to={`/admin/quan-ly-nguoi-dung/thong-tin-nguoi-dung?id=${id}`}
        style={{ marginLeft: 8 }}
      >
        {username}
      </Link>
    </>
  );
};
