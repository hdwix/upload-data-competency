export interface IEvaluationData {
  evaluationPeriod: string;
  evaluationCategory: string;
  periodCa: {
    isOpen: boolean;
    startDate: string;
    endDate: string;
  };
}