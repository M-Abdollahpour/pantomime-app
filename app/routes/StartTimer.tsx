import { useState } from "react";
import { useNavigate } from "react-router";
import CountDown from "~/components/countDown";
import { useGameStore } from "~/stores/gameStore";

const MAX_REROLLS = 3;

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
  const rerollsUsed = useGameStore((state) => state.rerollsUsed);
  const rerollWord = useGameStore((state) => state.rerollWord);
  const correctGuess = useGameStore((state) => state.correctGuess);
  console.log(correctGuess);
  const [isWordVisible, setIsWordVisible] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const rerollsLeft = MAX_REROLLS - rerollsUsed;
  const handleCorrectGuess = () => {
    correctGuess();
    navigate("/startgame/turnteam");
  };

  return (
    <div className="container mx-auto p-8 text-center">
      <p>{currentTeam.name}</p>
      <p>{actingPlayer.name} is acting</p>

      <CountDown totalTime={gameSetting.timePerTurn} isRunning={hasStarted} />
      <div className="my-6">
        <div
          className="border rounded-lg p-6 text-2xl font-bold cursor-pointer select-none"
          onClick={() => setIsWordVisible((prev) => !prev)}
        >
          {isWordVisible ? currentWord : "Tap to reveal"}
        </div>
      </div>

      <div className="flex justify-center gap-4 mb-6">
        <button
          className="border bg-gray-300 px-4 py-2 rounded-lg disabled:opacity-50"
          disabled={rerollsLeft <= 0}
          onClick={rerollWord}
        >
          Change Word ({rerollsLeft} left)
        </button>
        <button
          className="border bg-green-400 px-4 py-2 rounded-lg"
          onClick={handleCorrectGuess}
        >
          Correct Guess
        </button>
      </div>
      <div>
        {!hasStarted && (
          <button onClick={() => setHasStarted(true)}>Start Timer</button>
        )}
      </div>
    </div>
  );
}
