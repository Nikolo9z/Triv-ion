import { useState } from "react";
import "./App.css";
import Categories from "./components/Categories";
import Questions from "./components/Questions";
import Header from "./components/Header";

function App() {
  const [categoryId, setCategory] = useState<number>();
  const [difficult, setDifficulty] = useState<string>("");

  const selectCategory = (categoria: number, dif:string) => {
    setCategory(categoria);
    setDifficulty(dif);
  };

  const resetGame = () => {
    setCategory(undefined);
  };

  const quests = categoryId ? (
    <Questions categoryId={categoryId} difficulty={difficult}  resetGame={resetGame} />
  ) : (
    <Categories selectCategory={selectCategory} />
  );
  return <>
  <Header />
  {quests}
  </>;
}

export default App;
