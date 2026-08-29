import { Link } from "react-router";
import CloseGame from "~/components/closeGame";
import { useGameStore } from "~/stores/gameStore";
import { Card, BorderBeam, Button } from "antd";
import { FaPeoplePulling, FaPeopleLine } from "react-icons/fa6";

export default function StartGame() {
  const gameSetting = useGameStore((state) => state.gameSettings);
  const team = useGameStore((state) => state.teams);
  const currentRound = useGameStore((state) => state.currentRound);
  const currentTeamIndex = useGameStore((state) => state.currentTeamIndex);
  const gameTitle = useGameStore((state) => state.gameTitle);
  const currentTeam = team[currentTeamIndex];
  const playerIndex = (currentRound - 1) % currentTeam.players.length;
  const actingPlayer = currentTeam.players[playerIndex];

  return (
    <div className="min-h-screen bg-[#E2E8F0]">
      <div className="container mx-auto max-w-3xl px-4 py-6 text-center sm:px-6 sm:py-8">
        <div className="flex flex-col items-center gap-4 sm:gap-5 bg-[#F8FAFC] rounded-lg py-5">
          <CloseGame />
          <h1 className="text-4xl font-bold border rounded-lg px-7 py-2 bg-gray-300">
            {gameTitle}
          </h1>
          <ul className="flex flex-wrap justify-center gap-8">
            {team.map((item, index) => {
              const isCurrentTeam = index === currentTeamIndex;
              return (
                <li key={item.id} className="flex items-center gap-5">
                  {isCurrentTeam ? (
                    <BorderBeam>
                      <Card
                        className="w-46 sm:w-46"
                        style={{
                          backgroundColor: "#E2E8F0",
                          color: "#78350F",
                        }}
                      >
                        <div className="flex flex-col items-center justify-center rounded-lg p-5 text-lg">
                          <h3 className="w-full font-bold">{item.name}</h3>
                          <span>Score: {item.score}</span>
                        </div>
                      </Card>
                    </BorderBeam>
                  ) : (
                    <Card
                      className="w-46 sm:w-46"
                      style={{
                        backgroundColor: "#ffffff",
                        color: "#000",
                      }}
                    >
                      <div className="flex flex-col items-center justify-center rounded-lg p-5 text-lg">
                        <h3 className="w-full font-bold">{item.name}</h3>
                        <span>Score: {item.score}</span>
                      </div>
                    </Card>
                  )}
                  {index < team.length - 1 && (
                    <span className="font-bold">VS</span>
                  )}
                </li>
              );
            })}
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
