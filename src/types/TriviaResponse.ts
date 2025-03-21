export type TriviaResponse ={
  response_code: number;
  results: Result[];
}

type Result = {
  type: string;
  difficulty: string;
  category: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}