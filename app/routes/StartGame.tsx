import { Link } from "react-router";
import CloseGame from "~/components/closeGame";
import { useGameStore } from "~/stores/gameStore";
import { Card, BorderBeam, Button } from "antd";
import { PersonStanding } from "lucide-react";
import { useMemo } from "react";

export default function StartGame() {
  const gameSetting = useGameStore((state) => state.gameSettings);
  const team = useGameStore((state) => state.teams);
  const currentRound = useGameStore((state) => state.currentRound);
  const currentTeamIndex = useGameStore((state) => state.currentTeamIndex);
  const currentTeam = team[currentTeamIndex];
  const playerIndex = (currentRound - 1) % currentTeam.players.length;
  const actingPlayer = currentTeam.players[playerIndex];
  const teamPairs = useMemo(() => {
    const pairs = [];
    for (let i = 0; i < team.length; i += 2) {
      pairs.push(team.slice(i, i + 2));
    }
    return pairs;
  }, [team]);
  return (
    <div className="min-h-screen bg-[#E2E8F0]">
      <div className="container mx-auto max-w-3xl px-4 py-6 text-center sm:px-6 sm:py-8">
        <div className="flex flex-col items-center gap-4 sm:gap-5 bg-[#F8FAFC] rounded-lg py-5">
          <CloseGame />
          <ul className="flex flex-wrap justify-center gap-8">
            {teamPairs.map((pair, pairIndex) => (
              <li key={pairIndex} className="flex items-center gap-5">
                {pair.map((item, index) => {
                  const isCurrentTeam =
                    team.findIndex((t) => t.id === item.id) ===
                    currentTeamIndex;
                  const cardContent = (
                    <Card
                      className="w-32 sm:w-36"
                      style={{
                        backgroundColor: isCurrentTeam ? "#E2E8F0" : "#ffffff",
                        color: isCurrentTeam ? "#78350F" : "#000",
                      }}
                    >
                      <div className="flex flex-col items-center justify-center p-5 rounded-lg">
                        <h3
                          className="font-bold w-full truncate"
                          title={item.name}
                        >
                          {item.name}
                        </h3>
                        <span className="whitespace-nowrap">
                          Score: {item.score}
                        </span>
                      </div>
                    </Card>
                  );
                  return (
                    <div key={item.id} className="flex items-center gap-5">
                      {isCurrentTeam ? (
                        <BorderBeam>{cardContent}</BorderBeam>
                      ) : (
                        cardContent
                      )}
                      {index === 0 && pair.length === 2 && (
                        <span className="font-bold">VS</span>
                      )}
                    </div>
                  );
                })}
              </li>
            ))}
          </ul>
          <div className="w-full max-w-xl">
            <Card>
              <div className="flex justify-center items-center text-center p-5">
                <span className="flex gap-2 items-center justify-center">
                  <span>Round</span>
                  <h3 className="font-bold">{currentRound}</h3>
                  <span>of</span>
                  <h3 className="font-bold">{gameSetting.totalRounds}</h3>
                </span>
              </div>
              <div className="flex justify-center items-center text-center p-5 flex-col">
                <h3 className="font-bold flex items-center justify-center">
                  <PersonStanding />
                  {currentTeam.name}
                </h3>
                <span className="p-2 flex gap-2">
                  <h3 className="font-bold">{actingPlayer.name},</h3> Get Ready
                  to Act!
                </span>
              </div>
            </Card>
          </div>
          <div className="w-full max-w-xl">
            <Link to={"pickword"} className="block w-full">
              <Button type="primary" className="w-full rounded-lg px-4 py-2">
                PICK A WORD
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
