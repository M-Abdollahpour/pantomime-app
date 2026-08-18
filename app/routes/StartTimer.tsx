import { useEffect, useState } from "react";
import { useGameStore } from "~/stores/gameStore";
import { Flex, Progress } from "antd";
import type { ProgressProps } from "antd";
export default function StartTimer() {
  const gameSetting = useGameStore((state) => state.gameSettings);
  const team = useGameStore((state) => state.teams);
  const currentTeamIndex = useGameStore((state) => state.currentTeamIndex);
  const currentTeam = team[currentTeamIndex];
  const pickWord = useGameStore((state) => state.pickWord);
  const [time, setTime] = useState(gameSetting.timePerTurn);
  useEffect(() => {
    if (time <= 0) return;
    const intervalId = setInterval(() => {
      setTime((prevValue) => {
        if (prevValue <= 1) {
          clearInterval(intervalId);
          return 0;
        }
        return prevValue - 1;
      });
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);
  // const conicColors: ProgressProps["strokeColor"] = {
  //   "25%": "#FF0800",
  //   "50%": "#FFAE00",
  //   "100%": "#87d068",
  // };
  return (
    <div className="container mx-auto">
      <p>{currentTeam.name} turn</p>
      <ul>
        {currentTeam.players.map((item, i) => (
          <li key={item.id}>{item.name} is acting</li>
        ))}
      </ul>
      <div>{time}s</div>
      {/* <Flex vertical gap="medium">
        <Flex gap="small" wrap>
          <Progress
            type="circle"
            steps={time}
            percent={time}
            strokeColor={conicColors}
          />
        </Flex>
      </Flex> */}
    </div>
  );
}
