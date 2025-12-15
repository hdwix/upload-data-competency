import { CompetencyAttainment } from '../../domain/entities/competency-attainment.entity';
import { ECompetencyType } from '../enum/competency-type.enum';

export interface IValidateCompetency {
  competencyType: ECompetencyType;
  competencyAttainment: CompetencyAttainment;
}