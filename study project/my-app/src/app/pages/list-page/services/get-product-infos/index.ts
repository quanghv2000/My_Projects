import { IProductInfo } from 'models/api-model/response';
// import { requestAPI } from 'utils/configs/api-config';
// import { APP_API } from 'utils/constants';

export const getProductInfosService = async (): Promise<IProductInfo[]> => {
  // const apiUrl = APP_API.MY_APP.GET_ALL_USERS;
  // const res = await requestAPI.get(apiUrl);

  const res = {
    data: [
      {
        id: 1,
        name: 'Product 1',
        price: '10000'
      }
    ]
  };

  return res.data as IProductInfo[];
};
