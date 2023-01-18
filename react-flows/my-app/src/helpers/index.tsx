export * from './notifications-manager';
export * from './storage-manager';

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
