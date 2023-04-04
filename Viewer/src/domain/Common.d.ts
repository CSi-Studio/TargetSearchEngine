export type NumberPair = {
  left: number;
  right: number;
};

export type LabelValue = {
  label: string;
  value: any;
};

export type IdName = {
  id: string;
  name: string;
};

export type Pagination = {
  total: number;
  pageSize: number;
  current: number;
};

export type Result<T> = {
  success: boolean;
  msgCode: string;
  msgInfo: string;
  status: number;
  errorList: string[];
  data: T;
  featureMap: any; //实际上是一个Map<string, any>
  pagination: Pagination;
  total: number;
  pageSize: number;
};
