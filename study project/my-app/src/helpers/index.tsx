export * from './notifications';
export * from './validations';

export interface IErrorRespone {
  data?: {
    statusCode?: number;
    message?: string;
  };
  status?: number;
  statusText?: string;
}

export function errorRespone(errorRes: any): IErrorRespone {
  const { data, status, statusText } = errorRes?.response;

  return { data, status, statusText };
}
