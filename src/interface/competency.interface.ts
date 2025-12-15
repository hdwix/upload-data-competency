import { ECompetencyType } from '../enum/competency-type.enum';
import { ELxpType } from '../../domain/entities/lxp-competency-description.entity';

export interface CompetencyResult {
  competency: CompetencyData[];
  overallFeedback: string;
  is_peers?: boolean;
  is_subordinate?: boolean;
}

export interface CompetencyData {
  title: string;
  description: string;
  value: string;
  selfAssessment?: string;
  peersRating?: RatingData[];
  subordinatesRating?: RatingData[];
}

export interface RatingData {
  name: string;
  value: string;
}

export interface CompetencyConfig {
  competencyType: ECompetencyType;
  lxpType: ELxpType;
  repository: any;
  getAssessmentMethod: string;
  idField: string;
  ratingField: string;
  lxpField: string;
}
