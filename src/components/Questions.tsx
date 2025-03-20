import { useEffect, useState } from "react";
import { getQuestions } from "../services/questionServices";
import { Quests } from "../types/Quests";
import Loading from "./Loading";
import he from "he";
type Props = {
  categoryId: number;
  difficulty: string;
  resetGame: () => void;
};

function Questions({ categoryId,difficulty, resetGame }: Props) {
  const [questions, setQuestions] = useState<Quests[]>([]);
  const [indice, setIndice] = useState<number>(0);
  const [points, setPoints] = useState<number>(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isAnswerEvaluated, setIsAnswerEvaluated] = useState<boolean>(false);
  const [isLocked, setIsLocked] = useState<boolean>(false);
  const [gameOver, setGameOver] = useState<boolean>(false);

  useEffect(() => {
    const fetchQuestions = async () => {
      const data = await getQuestions(categoryId, difficulty);
      setQuestions(data);
    };
    fetchQuestions();
  }, [categoryId, difficulty]);

  const Answer = (indice: number) => {
    if (questions.length === 0) {
      return <Loading />;
    }
    return (
      <div className="flex flex-col justify-between gap-2 w-full min-lg:px-30 max-md:px-5  ">
        <h1 className="text-3xl max-md:text-2xl font-bold px-3 text-[#9d4edd]">
          {he.decode(questions[indice].question)}
        </h1>
        <div className="flex flex-col items-center gap-10">
          {questions[indice].answers.map((answer, index) => (
            <button
              key={index}
              className={`bg-gray-300 text-[#ff6d00] max-md:w-30 max-md:h-10 max-md:text-xl  font-semibold rounded text-3xl cursor-pointer transition-transform duration-200 min-w-full h-30
    ${
      selectedAnswer === index
        ? isAnswerEvaluated
          ? questions[indice].answers[index] ===
            questions[indice].correct_answer
            ? "bg-green-500"
            : "bg-red-500"
          : "bg-gray-300"
        : "bg-gray-300"
    }
    ${selectedAnswer === null && !isLocked ? "hover:bg-gray-400" : ""}`}
              onClick={() => evaluateAnswer(indice, index)}
              disabled={isLocked}
            >
              {he.decode(answer)}
            </button>
          ))}
        </div>
      </div>
    );
  };

  const correctAnswer = (indiceQuestion: number, indiceSelect: number) => {
    if (
      questions[indiceQuestion].answers[indiceSelect] ===
      questions[indiceQuestion].correct_answer
    ) {
      setPoints(points + 1);
      return true;
    }
    return false;
  };
  const evaluateAnswer = (indiceQuestion: number, indiceSelect: number) => {
    if (isLocked) {
      return;
    }
    setIsLocked(true);
    setSelectedAnswer(indiceSelect);
    correctAnswer(indiceQuestion, indiceSelect);
    setIsAnswerEvaluated(true);
    setTimeout(() => {
      if (indice + 1 === 10) {
        setGameOver(true);
      } else {
        setIndice(indice + 1);
      }
      setSelectedAnswer(null);
      setIsAnswerEvaluated(false);
      setIsLocked(false);
    }, 2000);
  };

  const endGame = () => {
    return (
      <div className="flex flex-col items-center gap-4">
        <h1 className="text-3xl text-white">
          You have finished the quiz with {points} points
        </h1>
        <button
          className="bg-gray-300 rounded text-5xl cursor-pointer transition-transform duration-200 w-full h-30 hover:bg-gray-400"
          onClick={() => {
            setIndice(0);
            setPoints(0);
            setGameOver(false);
            resetGame();
          }}
        >
          Restart
        </button>
      </div>
    );
  };

  return (
    <div className="flex flex-col items-center  max-lg:pt-5 min-lg:pt-10 w-full">
      <div className="flex text-3xl max-md:text-2xl gap-5 min-lg:pb-8">
        <h2 className=" font-bold text-[#ff9e00]">
          Question {indice + 1}/10
        </h2>
        <h3 className=" font-bold text-[#ff9e00]">Points: {points}</h3>
      </div>
      {gameOver ? endGame() : Answer(indice)}
    </div>
  );
}

export default Questions;
