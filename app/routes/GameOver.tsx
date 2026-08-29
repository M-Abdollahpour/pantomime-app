import { useNavigate } from "react-router";
import { useGameStore } from "~/stores/gameStore";
import { Button, Card } from "antd";
import { GiFlame } from "react-icons/gi";
import { FaPeopleGroup } from "react-icons/fa6";
import { IoHome } from "react-icons/io5";
import { FaGamepad } from "react-icons/fa";
export default function GameOver() {
  const navigate = useNavigate();
  const teams = useGameStore((state) => state.teams);
  const resetGame = useGameStore((state) => state.resetGame);
  const sortedTeams = [...teams].sort((a, b) => b.score - a.score);
  const resetAll = useGameStore((state) => state.resetAll);
  const gameTitle = useGameStore((state) => state.gameTitle);
  const winner = sortedTeams[0];
  const topScore = sortedTeams[0]?.score;
  const winningTeams = sortedTeams.filter((team) => team.score === topScore);

  const handlePlayAgain = () => {
    resetGame();
    navigate("/startgame");
  };
  const handleNewGame = () => {
    resetAll();
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-[#E2E8F0]">
      <div className="container mx-auto max-w-3xl  px-4 py-6 text-center sm:px-6 sm:py-8">
        <div className="flex flex-col gap-4">
          <Card>
            <div>
              <h1 className="text-4xl font-bold border rounded-lg px-7 py-2 bg-gray-300">
                {gameTitle}
              </h1>
              <h1 className="text-3xl font-bold mb-2">Game Over</h1>
              {winningTeams.length > 1 ? (
                <p className="mb-6 text-xl">🤝 IT'S A DRAW!</p>
              ) : (
                <p className="mb-6 text-2xl">🏆 {winner?.name} Wins!</p>
              )}
              <ul className="flex flex-col gap-2 max-w-sm mx-auto">
                {sortedTeams.map((team) => (
                  <li
                    key={team.id}
                    className={`flex justify-between text-lg p-3 rounded-lg border ${
                      team.score === topScore
                        ? "bg-amber-300 scale-110"
                        : "bg-gray-100"
                    }`}
                  >
                    <span className="flex gap-2 items-center">
                      <FaPeopleGroup />
                      {team.name}
                    </span>
                    <span className="font-bold text-amber-600 flex gap-2 items-center">
                      <GiFlame />
                      {team.score} pts
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </Card>
          <Card>
            <div className="flex justify-center flex-col gap-4 mt-6">
              <Button
                type="text"
                className="border! bg-gray-400! py-7! rounded-lg! hover:bg-gray-200! transition-all duration-100"
                onClick={handlePlayAgain}
              >
                <div className="flex gap-2 items-center text-xl">
                  <FaGamepad />
                  Play Again
                </div>
              </Button>
              <Button
                type="text"
                className="border! bg-gray-300! py-7! rounded-lg! hover:bg-gray-100! transition-all!"
                onClick={handleNewGame}
              >
                <div className="flex gap-2 items-center text-xl">
                  <IoHome />
                  New Game
                </div>
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
