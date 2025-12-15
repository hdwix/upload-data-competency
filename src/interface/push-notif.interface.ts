import { ERoleCategory, EWorklistCategory } from '../enum/worklist.enum';

export interface IPushNotif {
  userEmail: string;
  TransactionId: number;
  InboxModule: string;
  InboxTitle: string;
  InboxStatus: string;
  InboxApproverStatus: string;
  InboxLabelStatus: string;
  InboxDesc1: string;
  InboxDesc2: EWorklistCategory;
  InboxDesc3?: ERoleCategory;
}

export interface ICloseWorkflow {
  Id: number;
  userEmail?: string;
  InboxStatus: string;
  InboxApproverStatus: string;
  InboxLabelStatus?: string;
}

export interface IWorklistItem {
  Id: number;
  ActivityId: number;
  UserId: number;
  UserName: string;
  TransactionId: string;
  InboxModule: string;
  InboxTitle: string;
  InboxStatus: string;
  InboxApproverStatus: string;
  InboxLabelStatus: string;
  InboxDesc1: string;
  InboxDesc2: string;
  InboxDesc3: string;
  CreatedDate: string;
  IsExternal: boolean;
}

export interface ICheckDoubleContentResponse {
  Worklist: IWorklistItem[];
  Message: {
    Success: boolean;
    Count: number;
  };
}

export interface IGetWorklistByEmailResponse {
  Worklist: IWorklistItem[];
  Message: {
    Success: boolean;
    Count: number;
  };
}
