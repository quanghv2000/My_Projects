export interface IErrorRespone {
  data?: {
    statusCode?: number;
    message?: string;
  };
  status?: number;
  statusText?: string;
}
