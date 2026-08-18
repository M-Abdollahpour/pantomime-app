import { Link } from "react-router";
import { useGameStore } from "~/stores/gameStore";

export default function StartGame() {
  const gameSetting = useGameStore((state) => state.gameSettings);
  const team = useGameStore((state) => state.teams);
  const currentRound = useGameStore((state) => state.currentRound);
  const currentTeamIndex = useGameStore((state) => state.currentTeamIndex);
  const currentTeam = team[currentTeamIndex];

  return (
    <div className="container mx-auto p-8 text-center ">
      <ul className=" flex justify-center gap-5 items-center text-center">
        {team.map((item, index) => (
          <li key={item.id} className="flex items-center gap-5">
            <div className="w-30 h-30 flex items-center justify-center bg-amber-400 rounded-lg">
              {item.name}
              <br />
              {item.score}
            </div>
            {index < team.length - 1 && <span>Vs</span>}
          </li>
        ))}
      </ul>
      <div className="flex justify-center items-center text-center p-5">
        <span className="bg-gray-500 w-75 rounded-lg">
          Round {currentRound} of {gameSetting.totalRounds}
        </span>
      </div>
      <div className="flex justify-center items-center text-center p-5 flex-col">
        <span>{currentTeam.name}</span>
        <span>Get Ready to Act!</span>
      </div>
      <Link to={"pickword"}>
        <button className="bg-amber-300 border rounded-lg px-4 py-2">
          PICK A WORD
        </button>
      </Link>
    </div>
  );
}
