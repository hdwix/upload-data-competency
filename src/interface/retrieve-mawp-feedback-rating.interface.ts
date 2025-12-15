export interface IAssessorGroup {
  list: any[];
}

export interface IListAssessorItem {
  peers: IAssessorGroup;
  directSubordinate: IAssessorGroup;
}

export interface IRetrieveMawpFeedbackRating {
  overallRating: string;
  listAssessor: IListAssessorItem[];
}
