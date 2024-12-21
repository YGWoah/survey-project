export interface Survey {
  id: string;
  title: string;
  description: string;
  questions: Question[];
}

export interface Question {
  id: string;
  text: string;
}

export interface Answer {
  username: string;
  response: string;
}

export interface SurveyResponse {
  [question: string]: Answer[];
}

export interface SurveyResponseData {
  username: string;
  responses: Omit<Answer, 'username'>[];
}

export interface User {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
}
