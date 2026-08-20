import { useNavigate } from "react-router";
import { useGameStore } from "~/stores/gameStore";

export default function TurnTeam() {
  const navigate = useNavigate();
  const lastTurnPoints = useGameStore((state) => state.lastTurnPoints);
  const lastTurnTeamId = useGameStore((state) => state.lastTurnTeamId);
  const teams = useGameStore((state) => state.teams);
  const currentRound = useGameStore((state) => state.currentRound);
  const gameSetting = useGameStore((state) => state.gameSettings);

  const team = teams.find((t) => t.id === lastTurnTeamId);
  const isGameOver = currentRound > gameSetting.totalRounds;

  const handleContinue = () => {
    navigate(isGameOver ? "/startgame/gameover" : "/startgame");
  };

  return (
    <div className="container mx-auto p-8 text-center">
      {lastTurnPoints && lastTurnPoints > 0 ? (
        <>
          <h2 className="text-2xl font-bold text-green-600">Correct!</h2>
          <p>
            {team?.name} earned {lastTurnPoints} points
          </p>
        </>
      ) : (
        <h2 className="text-2xl font-bold text-red-600">No Points</h2>
      )}
      <button
        className="border bg-amber-400 px-4 py-2 rounded-lg mt-4"
        onClick={handleContinue}
      >
        Continue
      </button>
    </div>
  );
}
