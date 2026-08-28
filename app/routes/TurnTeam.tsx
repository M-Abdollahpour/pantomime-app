import { useNavigate } from "react-router";
import { useGameStore } from "~/stores/gameStore";
import { Button, Card } from "antd";
import { CheckCheckIcon, LocateFixedIcon } from "@animateicons/react/lucide";
import { GiPodiumWinner } from "react-icons/gi";
import { ExclamationCircleFilled } from "@ant-design/icons";
import { MdOutlineSportsScore } from "react-icons/md";
import { FaPeopleLine, FaRegFileWord } from "react-icons/fa6";
import { BiCategoryAlt } from "react-icons/bi";

export default function TurnTeam() {
  const navigate = useNavigate();
  const lastTurnPoints = useGameStore((state) => state.lastTurnPoints);
  const lastTurnTeamId = useGameStore((state) => state.lastTurnTeamId);
  const teams = useGameStore((state) => state.teams);
  const currentRound = useGameStore((state) => state.currentRound);
  const gameSetting = useGameStore((state) => state.gameSettings);
  const lastWord = useGameStore((state) => state.lastTurnWord);
  const categories = useGameStore((state) => state.categories);
  const lastTurnCategoryId = useGameStore((state) => state.lastTurnCategoryId);
  const currentCategory = categories.find((c) => c.id === lastTurnCategoryId);
  const team = teams.find((t) => t.id === lastTurnTeamId);
  const isGameOver = currentRound > gameSetting.totalRounds;

  const handleContinue = () => {
    navigate(isGameOver ? "/startgame/gameover" : "/startgame");
  };

  return (
    <div className="min-h-screen bg-[#E2E8F0]">
      <div className="container mx-auto max-w-3xl px-4 py-6 text-center sm:px-6 sm:py-8">
        <div className="mx-auto w-full max-w-3xl rounded-lg border bg-[#F8FAFC] p-3 sm:p-5">
          <Card>
            {lastTurnPoints && lastTurnPoints > 0 ? (
              <>
                <div className="flex justify-center items-center py-7 text-green-600 text-8xl">
                  <GiPodiumWinner />
                </div>
                <h2 className="text-4xl font-bold text-green-600 flex gap-2 items-center justify-center p-5">
                  <CheckCheckIcon duration={1} size={24} />
                  Guessed!
                </h2>
                <div className="text-xl">
                  <h1 className="flex gap-2 items-center border-b py-2">
                    <MdOutlineSportsScore />
                    Score Breakdown
                  </h1>
                  <div className="flex justify-between items-center py-2 text-pink-700">
                    <span className="flex gap-2 items-center">
                      <FaPeopleLine />
                      Team
                    </span>
                    <span>{team?.name}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 text-pink-700">
                    <span className="flex gap-2 items-center">
                      <FaRegFileWord />
                      word
                    </span>
                    <span>{lastWord}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b text-pink-700">
                    <span className="flex gap-2 items-center">
                      <BiCategoryAlt />
                      Category
                    </span>
                    <span>{currentCategory?.name}</span>
                  </div>
                  <div className="flex justify-between items-center text-purple-700">
                    <span>Points earned</span>
                    <span className="flex items-center gap-1 py-2">
                      {lastTurnPoints} pts
                      <LocateFixedIcon />
                    </span>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="flex justify-center items-center text-4xl">
                  <ExclamationCircleFilled className="text-red-600! py-7! text-8xl!" />
                </div>
                <h2 className="text-4xl font-bold text-red-600 flex gap-2 items-center justify-center p-5">
                  Time's Up!
                </h2>
                <div className="text-xl">
                  <h1 className="flex gap-2 items-center border-b py-2">
                    <MdOutlineSportsScore />
                    Round Summary
                  </h1>
                  <div className="flex justify-between items-center py-2 text-pink-700">
                    <span className="flex gap-2 items-center">
                      <FaPeopleLine />
                      Team
                    </span>
                    <span>{team?.name}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 text-pink-700">
                    <span className="flex gap-2 items-center">
                      <FaRegFileWord />
                      word
                    </span>
                    <span>{lastWord}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b text-pink-700">
                    <span className="flex gap-2 items-center">
                      <BiCategoryAlt />
                      Category
                    </span>
                    <span>{currentCategory?.name}</span>
                  </div>
                  <div className="flex justify-between items-center text-purple-700">
                    <span>Points earned</span>
                    <span className="flex items-center gap-1 py-2">0 pts</span>
                  </div>
                </div>
              </>
            )}
          </Card>
        </div>
        <div className="w-full max-w-3xl">
          <Card>
            <Button
              type="primary"
              className="w-full rounded-lg py-5!"
              onClick={handleContinue}
            >
              Continue
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
}
