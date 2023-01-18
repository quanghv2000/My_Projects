import { IProductInfoResponse } from 'models/api-model/response';
import { requestAPI } from 'utils/configs/api-config';
import { APP_API } from 'utils/constants';

export const getProductListService = async (): Promise<IProductInfoResponse[]> => {
  const apiUrl = APP_API.MY_APP.GET_ALL_PRODUCTS;
  const res = await requestAPI.get(apiUrl);

  return res.data as IProductInfoResponse[];
};
