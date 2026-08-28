import { Link } from "react-router";
import CloseGame from "~/components/closeGame";
import { useGameStore } from "~/stores/gameStore";
import { Card, BorderBeam, Button } from "antd";
import { useMemo } from "react";
import { FaPeoplePulling, FaPeopleLine } from "react-icons/fa6";

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
                      className="w-46 sm:w-46"
                      style={{
                        backgroundColor: isCurrentTeam ? "#E2E8F0" : "#ffffff",
                        color: isCurrentTeam ? "#78350F" : "#000",
                      }}
                    >
                      <div className="flex flex-col text-lg items-center justify-center p-5 rounded-lg">
                        <h3 className="font-bold  w-full" title={item.name}>
                          {item.name}
                        </h3>
                        <span>Score: {item.score}</span>
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
                <span className="flex gap-2 items-center justify-center text-xl bg-gray-100 px-6 py-2 rounded-lg">
                  <span>Round</span>
                  <h3 className="font-bold text-2xl bg-gray-200 text-pink-500 rounded-lg px-2 py-1">
                    {currentRound}
                  </h3>
                  <span>of</span>
                  <h3 className="font-bold text-2xl bg-gray-200 text-pink-800 rounded-lg px-2 py-1">
                    {gameSetting.totalRounds}
                  </h3>
                </span>
              </div>
              <div className="flex justify-center items-center text-center p-5 flex-col bg-gray-100 rounded-lg">
                <h3 className="font-bold flex gap-2 items-center justify-center text-4xl">
                  <FaPeopleLine />

                  {currentTeam.name}
                </h3>
                <span className="p-2 flex gap-2 items-center justify-center">
                  <h3 className="font-bold text-xl flex gap-2 items-center">
                    <FaPeoplePulling />
                    {actingPlayer.name},
                  </h3>
                  Get Ready to Act!
                </span>
              </div>
            </Card>
          </div>
        </div>
        <div className="w-full max-w-3xl">
          <Card>
            <Link to={"pickword"} className="block w-full">
              <Button
                type="primary"
                className="w-full rounded-lg text-xl! py-5!"
              >
                PICK A WORD
              </Button>
            </Link>
          </Card>
        </div>
      </div>
    </div>
  );
}
