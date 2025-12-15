export interface IDataPoint {
  name: string;
  y: number;
}

export interface ISpiderChart {
  chart: {
    type: string;
    name: string;
    points: IDataPoint[];
  };
}

export interface IAssesseeInfo {
  nik: string;
  name: string;
  title: string;
}

export interface IChartAssessment {
  chartTitle: string;
  overallFeedback: string;
  requiredRole: ISpiderChart;
  assessmentRating: ISpiderChart;
}

export interface IMawpChart {
  chartTitle: string;
  overallFeedback: string;
  assessmentRating: ISpiderChart;
}

export interface IAssessmentChartResult {
  id: number;
  evaluationPeriod: string;
  assessmentDate: string;
  evaluationType: string;
  asesseeInformation: IAssesseeInfo;
  technicalCompetencyAssessment: IChartAssessment;
  leadershipCompetencyAssessment: IChartAssessment;
  workingPrincipleCompetencyAssessment: IMawpChart;
}
