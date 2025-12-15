export type CompetencyLevel =
  | 'Not Applicable'
  | 'Basic'
  | 'Intermediate'
  | 'Proficient'
  | 'Advanced'
  | 'Master';
export interface CompetencyRatingMapping {
  title: string;
  value: CompetencyLevel;
}
