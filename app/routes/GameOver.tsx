import { useNavigate } from "react-router";
import { useGameStore } from "~/stores/gameStore";

export default function GameOver() {
  const navigate = useNavigate();
  const teams = useGameStore((state) => state.teams);
  const resetGame = useGameStore((state) => state.resetGame);
  const sortedTeams = [...teams].sort((a, b) => b.score - a.score);
  const resetAll = useGameStore((state) => state.resetAll);
  const winner = sortedTeams[0];

  const handlePlayAgain = () => {
    resetGame();
    navigate("/startgame");
  };
  const handleGoHome = () => {
    resetAll();
    navigate("/");
  };

  return (
    <div className="container mx-auto p-8 text-center">
      <h1 className="text-3xl font-bold mb-2">Game Over</h1>
      <p className="text-xl mb-6">🏆 {winner.name} Wins!</p>
      <ul className="flex flex-col gap-2 max-w-sm mx-auto">
        {sortedTeams.map((team, index) => (
          <li
            key={team.id}
            className={`flex justify-between p-3 rounded-lg border ${
              index === 0 ? "bg-amber-500" : "bg-gray-100"
            }`}
          >
            <span>{team.name}</span>
            <span className="font-bold">{team.score} pts</span>
          </li>
        ))}
      </ul>
      <div className="flex justify-center gap-4 mt-6">
        <button
          className="border bg-amber-400 px-4 py-2 rounded-lg"
          onClick={handlePlayAgain}
        >
          Play Again
        </button>
        <button
          className="border bg-gray-300 px-4 py-2 rounded-lg"
          onClick={handleGoHome}
        >
          Back to Home
        </button>
      </div>
    </div>
  );
}
