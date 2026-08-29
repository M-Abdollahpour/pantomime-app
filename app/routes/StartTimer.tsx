import { useState } from "react";
import { useNavigate } from "react-router";
import CloseGame from "~/components/closeGame";
import CountDown from "~/components/countDown";
import { useGameStore } from "~/stores/gameStore";
import { playSound } from "~/utils/playSound";
import { GiPlayerTime } from "react-icons/gi";
import { Button, Card } from "antd";
import { EyeTwoTone, StarOutlined, FieldTimeOutlined } from "@ant-design/icons";
import {
  EyeIcon,
  UsersRoundIcon,
  CoinsIcon,
  CheckIcon,
} from "@animateicons/react/lucide";
import {
  DIFFICULTY_POINTS,
  MAX_REROLLS_BY_DIFFICULTY,
} from "~/types/categoryType";

export default function StartTimer() {
  const navigate = useNavigate();
  const gameSetting = useGameStore((state) => state.gameSettings);
  const team = useGameStore((state) => state.teams);
  const currentTeamIndex = useGameStore((state) => state.currentTeamIndex);
  const currentRound = useGameStore((state) => state.currentRound);
  const currentTeam = team[currentTeamIndex];
  const playerIndex = (currentRound - 1) % currentTeam.players.length;
  const actingPlayer = currentTeam.players[playerIndex];
  const currentWord = useGameStore((state) => state.currentWord);
  const gameTitle = useGameStore((state) => state.gameTitle);
  const rerollWord = useGameStore((state) => state.rerollWord);
  const correctGuess = useGameStore((state) => state.correctGuess);
  const soundSettings = useGameStore((state) => state.soundSettings);
  const categories = useGameStore((state) => state.categories);
  const skipGuess = useGameStore((state) => state.skipGuess);
  const currentCategoryId = useGameStore((state) => state.currentCategoryId);
  const currentCategory = categories.find((c) => c.id === currentCategoryId);
  const currentDifficulty = useGameStore((state) => state.currentDifficulty);
  const rerollsUsed = useGameStore((state) => state.rerollsUsed);
  const [isWordVisible, setIsWordVisible] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const maxRerolls = currentDifficulty
    ? MAX_REROLLS_BY_DIFFICULTY[currentDifficulty]
    : 0;
  const rerollsLeft = maxRerolls - rerollsUsed;
  const currentPoints = currentDifficulty
    ? Math.max(0, DIFFICULTY_POINTS[currentDifficulty] - rerollsUsed)
    : 0;
  const handleCorrectGuess = () => {
    if (soundSettings.partyMusic) {
      playSound("/sounds/correct.wav");
    }
    correctGuess();
    navigate("/startgame/turnteam");
  };
  const handleSkipGuess = () => {
    if (soundSettings.soundEffects) {
      playSound("/sounds/wronganswer.mp3");
    }
    skipGuess();
    navigate("/startgame/turnteam");
  };
  return (
    <div className="min-h-screen bg-[#E2E8F0]">
      <div className="container mx-auto max-w-3xl px-4 py-6 text-center sm:px-6 sm:py-8">
        <div className="flex flex-col items-center gap-4 sm:gap-5 bg-[#F8FAFC] rounded-lg py-5">
          <CloseGame />
          <h1 className="text-4xl font-bold border rounded-lg px-7 py-2 bg-gray-300">
            {gameTitle}
          </h1>
          <div className="w-full max-w-xl bg-white p-5 rounded-lg">
            <Card>
              <h1 className="font-bold text-2xl flex justify-center items-center gap-2 border-b py-4">
                <UsersRoundIcon size={24} duration={1} color="#000000" />
                {currentTeam.name}
              </h1>
              <p className="flex text-lg justify-center gap-2 items-center border-b py-4">
                <GiPlayerTime />
                <span className="font-bold">{actingPlayer.name}</span> is acting
              </p>
              <p className="py-5 flex items-center justify-center gap-2">
                Word value:
                <span className="bg-amber-500 px-4 py-1 rounded-2xl text-white flex gap-2">
                  <StarOutlined />
                  {currentPoints}
                </span>
              </p>
              <div className="flex items-center justify-center py-5">
                <CountDown
                  totalTime={gameSetting.timePerTurn}
                  isRunning={hasStarted}
                  onComplete={handleSkipGuess}
                />
              </div>
            </Card>
            <div>
              <div
                className={`border relative h-30 w-full max-w-xl rounded-lg p-6 cursor-pointer select-none my-5 flex justify-center items-center ${isWordVisible ? "bg-white" : "bg-blue-500"}`}
                onClick={() => setIsWordVisible((prev) => !prev)}
              >
                {isWordVisible ? (
                  <div className="w-full max-w-xl">
                    <small className="absolute right-1 top-1 flex gap-2 items-center">
                      <EyeTwoTone />
                      tap again to hide
                    </small>
                    <p className="text-4xl font-bold py-2">{currentWord}</p>
                    <p className="text-sm text-white rounded-lg bg-purple-400 py-1">
                      {currentCategory?.name}
                    </p>
                  </div>
                ) : (
                  <div className="flex flex-col justify-center items-center text-white">
                    <EyeIcon size={64} duration={1} color="#ffffff" />
                    <p className="font-bold">TAP TO SEE WORD</p>
                    <small>Memorise, then hide before acting</small>
                  </div>
                )}
              </div>
            </div>
            <div className="flex flex-col justify-center gap-4 py-5">
              <Button
                className="border px-4 py-2 rounded-lg disabled:opacity-50 w-full max-w-xl"
                danger
                disabled={hasStarted || rerollsLeft <= 0}
                onClick={rerollWord}
              >
                <CoinsIcon size={18} duration={1} />
                Change Word ({rerollsLeft} left(-1pt))
              </Button>
              <Button
                type="primary"
                className="w-full max-w-xl h-auto! rounded-lg! bg-green-500! px-4! py-7! text-white! hover:bg-green-600! disabled:opacity-50!"
                disabled={!hasStarted}
                onClick={handleCorrectGuess}
              >
                <CheckIcon duration={1} size={18} />
                Correct Guess
              </Button>
              <Button
                className="w-full max-w-xl"
                disabled={!hasStarted}
                onClick={handleSkipGuess}
              >
                End turn(0pts)
              </Button>
            </div>
          </div>
          <div className="w-full max-w-xl">
            <Button
              className="w-full rounded-lg px-4 py-2"
              type="primary"
              onClick={() => setHasStarted(true)}
              disabled={hasStarted}
            >
              <FieldTimeOutlined />
              Start Timer
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
