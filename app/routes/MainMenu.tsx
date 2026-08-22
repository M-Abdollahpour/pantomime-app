import { useGameStore } from "~/stores/gameStore";

import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { nanoid } from "nanoid";
import { Link } from "react-router";
import { capitalString } from "../utils/capitalString";
import { Typography, Button } from "antd";
import { Settings, Timer, RefreshCcw } from "lucide-react";

const { Title } = Typography;

import GameSetting from "~/components/gameSetting";
import FormAddTeam from "~/components/form";
import TeamItem from "~/components/teams";
import type { TeamFormValues } from "~/types/gamePantoType";

export default function MainMenu() {
  const teams = useGameStore((state) => state.teams);
  const updateTeamName = useGameStore((state) => state.updateTeamName);
  const addTeam = useGameStore((state) => state.addTeam);
  const updateTeamPlayerCount = useGameStore(
    (state) => state.updateTeamPlayerCount,
  );
  const updatePlayerName = useGameStore((state) => state.updatePlayerName);
  const gameSetting = useGameStore((state) => state.gameSettings);
  const setGameSettings = useGameStore((state) => state.setGameSettings);
  const removeTeams = useGameStore((state) => state.removeTeam);
  const schema: yup.ObjectSchema<TeamFormValues> = yup
    .object({
      name: yup.string().required("Name team is required").min(3),
    })
    .required();
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TeamFormValues>({
    resolver: yupResolver(schema),
    defaultValues: { name: "" },
  });
  const onSubmit = ({ name }: TeamFormValues) => {
    addTeam({
      name: capitalString(name),
      avatarId: 0,
      playerCount: 2,
      score: 0,
      players: [
        { id: nanoid(), name: "Player 1" },
        { id: nanoid(), name: "Player 2" },
      ],
    });
    reset();
  };
  return (
    <div className="min-h-screen bg-[#E2E8F0]">
      <div className="container mx-auto max-w-3xl px-4 py-6 text-center sm:px-6 sm:py-8">
        <div className="flex flex-col items-center gap-4 sm:gap-5">
          <Title className="w-full">PANTOMIME</Title>
          <span className="flex w-full max-w-xl items-center justify-center">
            <span className="flex-1 border border-red-700" />
            <span className="flex-1 border border-blue-700" />
          </span>
          <p className="bg-black text-white px-6 py-1 rounded-lg rotate-x-5 -rotate-y-15">
            Great Challenge
          </p>
          <TeamItem
            title="Teams"
            teams={teams}
            onUpdateTeamName={updateTeamName}
            onUpdateTeamPlayerCount={updateTeamPlayerCount}
            onUpdatePlayerName={updatePlayerName}
            onRemoveTeam={removeTeams}
          />
          <FormAddTeam
            onSubmit={handleSubmit(onSubmit)}
            control={control}
            errors={errors}
            isMaxTeamsReached={teams.length >= 6}
          />
          <div className="flex w-full max-w-xl gap-2 py-2">
            <Settings />
            <span>Game Settings</span>
          </div>
          <div className="w-full max-w-xl rounded-lg border bg-[#F8FAFC] p-3 sm:p-5">
            <GameSetting
              title="Rounds"
              icon={<RefreshCcw />}
              value={gameSetting.totalRounds}
              min={1}
              max={10}
              step={1}
              onChange={(newValue) =>
                setGameSettings({ ...gameSetting, totalRounds: newValue })
              }
            />
            <span className="flex w-full max-w-xl items-center justify-center">
              <span className="flex-1 h-px bg-gray-200" />
            </span>
            <GameSetting
              title="Time per turn"
              icon={<Timer />}
              value={gameSetting.timePerTurn}
              min={30}
              max={90}
              step={30}
              unit="s"
              onChange={(newValue) =>
                setGameSettings({ ...gameSetting, timePerTurn: newValue })
              }
            />
          </div>
          <div className="w-full max-w-xl">
            <Link to="/startgame" className="block w-full">
              <Button type="primary" className="w-full rounded-lg px-4 py-2">
                START GAME
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
