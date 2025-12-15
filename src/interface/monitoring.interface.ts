import { EIgTypeDropdown } from '../enum/ig-type-dropdown.enum';

export interface ISummaryProgress {
  igTotal: number;
  average: string;
  individualGoals: ITargetProgress[];
}

export interface ITargetProgress {
  id: number;
  target: string;
  individualGoalCategory: EIgTypeDropdown;
  monitoring: number;
}

export interface ITargetDetail {
  id: number;
  documentId: number;
  target: string;
  description: string;
  createdAt: string;
  targetOkr: string;

  startDate: string;
  endDate: string;
  title: string;
  igCategory: string;
  achievement: number;
  monitoringItems: IMonitoringItem[];
}

export interface IMonitoringItem {
  id: number;
  targetId: number;
  achievement: number;
  description: string;
  attachment: string;
  createdAt: string;
  updatedAt: string;
}
