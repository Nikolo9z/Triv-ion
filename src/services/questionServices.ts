import { Quests } from "../types/Quests";
import { TriviaResponse } from "../types/TriviaResponse";

export const getQuestions = async (
  category: number,
  difficulty: string
): Promise<Quests[]> => {
  const response = await fetch(
    "https://opentdb.com/api.php?amount=10&category=" +
      category +
      "&difficulty=" +
      difficulty +
      "&type=multiple"
  );
  if (!response.ok) {
    throw new Error("Failed to fetch questions");
  }
  const data: TriviaResponse = await response.json();
  const questions: Quests[] = data.results.map((question) => {
    return {
      question: question.question,
      correct_answer: question.correct_answer,
      answers: question.incorrect_answers
        .concat(question.correct_answer)
        .sort(() => Math.random() - 0.5),
    };
  });
  return questions;
};
