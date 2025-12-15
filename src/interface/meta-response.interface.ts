export interface IResponsePagination {
    data: any;
    messageResponse: string;
    pagination: {
        totalData: number,
        totalPage: number,
        limit: number,
        offset: number
    }
  }
  export interface IResponseTotalData {
    data: any;
    messageResponse: string;
    totalData: number;
  }
  export interface IResponseAverageData {
    data: any;
    messageResponse: string;
    averageData: number;
  }
  