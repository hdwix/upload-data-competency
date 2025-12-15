export interface IEmail {
  subject: string;
  body: string;
  is_html: string;
  recipients: string;
  sender?: string;
}


export interface IEmailTemplate {
  name: string;
  spvName?: string;
  periodDesc?: string;
  recogMonth?: string;
  recogRatingDesc?: string;
  recogFeedback?: string;
  goalsName?: string;
  goalsTarget?: string;
  goalsProgress?: string;
}

export interface IEmailList {
  trx_id: number;
  trx_name: string;
  subject: string;
  email_to: string;
  type: string;
  status?: string;
}