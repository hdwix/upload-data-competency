export interface ILatestProgress {
  avgMonitoringAchievement: number;
  targetCount: number;
  periodDescription: string;
}

export interface IAddProgressResponse {
  targetId: number;
  achievementPercent: number;
  description: string;
  attachmentPath: string;
  monitoringId: number;
  createdAt: string;
  createdBy: number;
  updatedAt: string;
  updatedBy: number;
  tanggal: string;
}
