export interface IFilterSubordinateRecog {
  periodId: number;
  spvId: string;
  offset: number;
  limit: number;
  sortBy: string;
}

export interface IFilterSubordinateRecogResponse {
  data: any;
  total: number;
}

export interface IFilterLimitOffsetSortby {
  limit: number;
  offset: number;
  sortBy?: string;
}
