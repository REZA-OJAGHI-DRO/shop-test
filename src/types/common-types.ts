export type ApiResponse<T> = {
  statusCode: number;
  message: string;
  isSuccess: boolean;
  errors: string[];
  data: T;
};

export type PaginatedResponse<T> = {
  data: T;
  count: number;
};

export type PaginatedDataRequestType<T> = {
  filter: T;
  pageSize: number;
  pageIndex: number;
  orderType: number;
  orderPropertyName: string;
};

export type KeyValuePairType = {
  key: string;
  value: string;
};
