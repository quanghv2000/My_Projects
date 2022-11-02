export interface IResponseData<T> {
  statusCode: number;
  message: string;
  data?: T;
}
