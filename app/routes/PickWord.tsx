import { useState } from "react";
import { useNavigate } from "react-router";
import CloseGame from "~/components/closeGame";
import { useGameStore } from "~/stores/gameStore";
import { DIFFICULTY_POINTS, type Difficulty } from "~/types/categoryType";
import { Button, Card } from "antd";
import { BiSolidCategoryAlt } from "react-icons/bi";
import { GiFireDash } from "react-icons/gi";
import { PiMicrosoftWordLogoLight } from "react-icons/pi";

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
  const usedCategoryDifficulties = useGameStore(
    (state) => state.usedCategoryDifficulties,
  );
  const isDifficultyUsed = (difficulty: Difficulty) => {
    if (!selectedCategoryId) return false;
    return usedCategoryDifficulties.includes(
      `${currentTeam.id}:${selectedCategoryId}:${difficulty}`,
    );
  };
  const [selectedDifficulty, setSelectedDifficulty] =
    useState<Difficulty | null>(null);
  const difficulties: Difficulty[] = ["easy", "medium", "hard"];
  const isCategorySelected = !!selectedCategoryId;
  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategoryId((prev) => (prev === categoryId ? null : categoryId));
    setSelectedDifficulty(null); // چون کتگوری عوض شده، سختی قبلی دیگه معتبر نیست
  };
  const handleDifficultySelect = (difficulty: Difficulty) => {
    if (!selectedCategoryId) return;
    setSelectedDifficulty((prev) => (prev === difficulty ? null : difficulty));
  };
  const handleStartTimer = () => {
    if (!selectedCategoryId || !selectedDifficulty) return;
    selectWord(selectedCategoryId, selectedDifficulty);
    navigate("/startgame/starttimer");
  };
  return (
    <div className="min-h-screen bg-[#E2E8F0]">
      <div className="container mx-auto max-w-3xl px-4 py-6 text-center sm:px-6 sm:py-8">
        <div className="flex flex-col items-center gap-4 sm:gap-5 bg-[#F8FAFC] rounded-lg py-5">
          <CloseGame />
          <h1 className="flex gap-1 items-center justify-center text-xl bg-gray-100 px-5 py-2 rounded-lg">
            <PiMicrosoftWordLogoLight />
            Word Selection For
            <span className="font-bold text-purple-500">
              {currentTeam.name}
            </span>
          </h1>
          <div className="w-full max-w-xl bg-white p-5 rounded-lg">
            <h3 className="pb-2 flex gap-2 items-center">
              <BiSolidCategoryAlt />
              Categories
            </h3>
            <ul className="grid grid-cols-3 gap-4 ">
              {categories.map((item) => (
                <li
                  className={`flex justify-center items-center p-4 rounded-lg cursor-pointer ${
                    selectedCategoryId === item.id
                      ? "bg-blue-600 text-white"
                      : "bg-blue-400 text-black"
                  }
                  `}
                  key={item.id}
                  onClick={() => handleCategorySelect(item.id)}
                >
                  <span>{item.name}</span>
                </li>
              ))}
            </ul>
          </div>
          <div
            className={`w-full max-w-xl bg-white p-5 rounded-lg transition-opacity ${
              isCategorySelected ? "" : "opacity-50 pointer-events-none"
            }`}
          >
            <h3 className="pb-2 flex items-center gap-2">
              <GiFireDash />
              Difficulty
            </h3>
            <ul className="grid grid-cols-3 gap-4">
              {difficulties.map((level) => {
                const used = isDifficultyUsed(level);
                return (
                  <li
                    key={level}
                    className={`flex flex-col justify-center items-center p-4 rounded-lg ${
                      used
                        ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                        : "cursor-pointer"
                    } ${
                      !used && selectedDifficulty === level
                        ? "bg-blue-600 text-white"
                        : !used
                          ? "bg-blue-400 text-black"
                          : ""
                    }`}
                    onClick={() => !used && handleDifficultySelect(level)}
                  >
                    <span className="text-sm">
                      {DIFFICULTY_POINTS[level]} pts
                    </span>
                    <small>{level}</small>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
        <div className="w-full max-w-3xl">
          <Card>
            <Button
              type="primary"
              className="w-full rounded-lg px-4 py-5! text-xl!"
              disabled={!selectedCategoryId || !selectedDifficulty}
              onClick={handleStartTimer}
            >
              START TIMER
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
}
