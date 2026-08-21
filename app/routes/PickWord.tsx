import { useState } from "react";
import { useNavigate } from "react-router";
import CloseGame from "~/components/closeGame/closeGame";
import { useGameStore } from "~/stores/gameStore";
import { DIFFICULTY_POINTS, type Difficulty } from "~/types/categoryType";

export default function PickWord() {
  const navigate = useNavigate();
  const categories = useGameStore((state) => state.categories);
  const team = useGameStore((state) => state.teams);
  const currentTeamIndex = useGameStore((state) => state.currentTeamIndex);
  const currentTeam = team[currentTeamIndex];
  const selectWord = useGameStore((state) => state.selectWord);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(
    null,
  );
  const [selectedDifficulty, setSelectedDifficulty] =
    useState<Difficulty | null>(null);

  const difficulties: Difficulty[] = ["easy", "medium", "hard"];

  const handleDifficultySelect = (difficulty: Difficulty) => {
    if (!selectedCategoryId) return;
    setSelectedDifficulty(difficulty);
  };
  const handleStartTimer = () => {
    if (!selectedCategoryId || !selectedDifficulty) return;
    selectWord(selectedCategoryId, selectedDifficulty);
    navigate("/startgame/starttimer");
  };

  return (
    <div className="container mx-auto p-8">
      <CloseGame />
      <h1 className="text-center">Word Selection For {currentTeam.name}</h1>

      <h3>Categories</h3>
      <ul className="grid grid-cols-3 gap-4 ">
        {categories.map((item) => (
          <li
            className={`flex justify-center items-center p-4 rounded-lg cursor-pointer ${
              selectedCategoryId === item.id ? "bg-amber-600" : "bg-amber-400"
            }`}
            key={item.id}
            onClick={() => setSelectedCategoryId(item.id)}
          >
            <span>{item.name}</span>
          </li>
        ))}
      </ul>

      {selectedCategoryId && (
        <>
          <h3>Difficulty</h3>
          <ul className="grid grid-cols-3 gap-4">
            {difficulties.map((level) => (
              <li
                key={level}
                className={`flex flex-col justify-center items-center p-4 rounded-lg cursor-pointer ${
                  selectedDifficulty === level ? "bg-blue-600" : "bg-blue-400"
                }`}
                onClick={() => handleDifficultySelect(level)}
              >
                <span>{level}</span>
                <span className="text-sm">{DIFFICULTY_POINTS[level]} pts</span>
              </li>
            ))}
          </ul>
          <button className="border bg-amber-400" onClick={handleStartTimer}>
            START TIMER
          </button>
        </>
      )}
    </div>
  );
}
