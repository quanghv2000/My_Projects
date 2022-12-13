import { IProductInfo } from 'models/api-model/response';
import { requestAPI } from 'utils/configs/api-config';
import { APP_API } from 'utils/constants';

export const getProductInfosService = async (): Promise<IProductInfo[]> => {
  const apiUrl = APP_API.MY_APP.GET_ALL_PRODUCTS;
  const res = await requestAPI.get(apiUrl);

  return res.data as IProductInfo[];
};
