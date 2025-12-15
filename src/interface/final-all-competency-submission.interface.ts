import { CompetencyAttainment } from '../../domain/entities/competency-attainment.entity';
import { CompetencyRatingMappingDto } from '../dto/submit-leadership-competency.dto';
import { ScoringMawpDto } from '../dto/submit-mawp-competency.dto';

export interface IFinalAllCompetencySubmission {
  competencyData: CompetencyAttainment;
  technicalCompetency: CompetencyRatingMappingDto[];
  leadershipCompetency: CompetencyRatingMappingDto[];
  mawpCompetency: ScoringMawpDto[];
}
