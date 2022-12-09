import { IUserInfo } from 'models/api-model/response';
import { API_URL, requestAPI } from 'utils/configs';

export const getAllUsersServices = async () => {
  const apiUrl = `${API_URL}/api/admin/users`;
  const res = await requestAPI.get(apiUrl);

  const usersInfo: IUserInfo = res?.data?.map(item => {
    const {
      id,
      login: username,
      fullName = 'Hà Văn Quang',
      email,
      phone,
      status = 'isActive',
      authorities: roles,
    } = item;

    return {
      id,
      fullName,
      username,
      email,
      phone,
      status,
      roles,
    };
  });

  return usersInfo;
};
