import { ERoleCategory, EWorklistCategory } from '../enum/worklist.enum';

export interface ISaveAssessorAssignment {
  role: ERoleCategory;
  category: EWorklistCategory;
  niks: string[];
  period_id?: number;
}

export interface ISaveAssessorAssignmentValidateRole {
  period_id: number;
  niks: string[];
}