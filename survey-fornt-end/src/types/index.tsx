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

export interface Response {
  id: string;
  text: string;
}
