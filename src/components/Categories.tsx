import { useState } from "react";
import { categoriesDict } from "../types/CategoriesDic";

type Props = {
  selectCategory: (categoryId: number, difficulty: string) => void;
};

function Categories({ selectCategory }: Props) {
  const [category, setCategory] = useState<number | null>(null);
  const [showDifficulty, setShowDifficulty] = useState<boolean>(false);

  const handleCategorySelect = (categoryId: number) => {
    setCategory(categoryId);
    setShowDifficulty(true);
  };

  const handleDifficultySelect = (difficulty: string) => {
    if (category !== null) {
      selectCategory(category, difficulty);
    }
  };

  return (
    <div className="flex flex-col items-center gap-14 pt-10 w-full">
      {!showDifficulty ? (
        <>
        <span className="text-[#ff9e00] px-30 max-md:px-10 text-xl text-center max-md:text-sm">Ready to test your knowledge and have fun at the same time?
        At Triv-ion, you can choose from a variety of categories, pick the difficulty level that challenges you the most, and answer 10 exciting questions. Do you think you can score a perfect result?</span>
          <h1 className="text-4xl max-md:text-2xl font-bold text-white">
            Select the category
          </h1>
          <div className="flex flex-wrap rounded-2xl gap-6 text-2xl max-md:text-xl text-[#9d4edd] w-full font-bold justify-center items-center">
            {Object.entries(categoriesDict).map(([categoryName, categoryId]) => (
              <button
                className="bg-[#ff9e00] rounded  cursor-pointer hover:scale-110 transition-transform duration-200 hover:bg-[#ff9e00] hover:text-white max-md:w-1/2 max-md:h-15 w-64 h-24"
                key={categoryId}
                onClick={() => handleCategorySelect(categoryId)}
              >
                {categoryName}
              </button>
            ))}
          </div>
        </>
      ) : (
        <>
          <h1 className="text-5xl max-md:text-2xl font-bold text-[#ff9e00]">
            Select the difficulty
          </h1>
          <div className="flex flex-wrap gap-6 text-3xl max-md:text-xl text-[#9d4edd] w-full font-bold justify-center items-center">
            {["easy", "medium", "hard"].map((difficulty) => (
              <button
                className="bg-[#ff9e00] rounded cursor-pointer hover:scale-110 transition-transform duration-200 hover:bg-[#ff9e00] hover:text-white max-md:w-1/2 max-md:h-15 w-64 h-24"
                key={difficulty}
                onClick={() => handleDifficultySelect(difficulty)}
              >
                {difficulty}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default Categories;
