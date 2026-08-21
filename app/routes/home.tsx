import { useGameStore } from "~/stores/gameStore";
import type { Route } from "./+types/home";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { nanoid } from "nanoid";
import { Link } from "react-router";
import { capitalString } from "../utils/capitalString";
import { Typography, Input, Button } from "antd";
import { Settings, Timer, UsersRound, RefreshCcw } from "lucide-react";
import { UserOutlined } from "@ant-design/icons";

const { Title } = Typography;

import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
export function meta({}: Route.MetaArgs) {
  return [{ title: "Pantomime" }];
}
type TeamFormValues = {
  name: string;
};
export default function Home() {
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
    <div className="bg-[#E2E8F0]">
      <div className="container mx-auto p-8 text-center ">
        <div className="flex flex-col gap-4 justify-center items-center">
          <Title className="w-full">PANTOMIME</Title>
          <span className="flex justify-center items-center">
            <span className="border w-screen border-red-700"></span>
            <span className="border w-screen border-blue-700"></span>
          </span>
          <p className="bg-black text-white px-6 py-1 rounded-lg rotate-x-5 -rotate-y-15">
            Great Challenge
          </p>
          <ul className="flex gap-5 flex-col w-svh">
            <div className="flex gap-2">
              <UsersRound />
              <span>Teams</span>
            </div>
            {teams.map((item) => (
              <li
                key={item.id}
                className="border p-2 bg-[#F8FAFC] rounded-lg flex gap-2 flex-col items-center justify-center"
              >
                <div className="flex w-full gap-2 border-b py-2">
                  <Avatar>
                    <AvatarImage
                      src="avatars/performing art.jpeg"
                      alt="@pranathip"
                    />
                    <AvatarFallback>PP</AvatarFallback>
                  </Avatar>
                  <Input
                    prefix={
                      <UserOutlined style={{ color: "rgba(0,0,0,.25)" }} />
                    }
                    maxLength={10}
                    showCount
                    className="border rounded-lg px-2 py-1"
                    type="text"
                    defaultValue={item.name}
                    onBlur={(e) =>
                      updateTeamName(item.id, capitalString(e.target.value))
                    }
                  />
                  {teams.length > 2 && (
                    <Button
                      onClick={() => removeTeams(item.id)}
                      type="primary"
                      danger
                      className="text-red-500"
                      shape="circle"
                      icon="X"
                    />
                  )}
                </div>
                <div className="border-b py-2 flex w-full justify-between">
                  <span>players</span>
                  <span className="flex items-center gap-4">
                    <Button
                      onClick={() =>
                        updateTeamPlayerCount(item.id, item.playerCount - 1)
                      }
                      type="primary"
                      disabled={item.playerCount === 1}
                      icon="-"
                      shape="circle"
                    />
                    <span className="inline-block w-4 text-center">
                      {item.playerCount}
                    </span>
                    <Button
                      onClick={() =>
                        updateTeamPlayerCount(item.id, item.playerCount + 1)
                      }
                      type="primary"
                      disabled={item.playerCount === 10}
                      icon="+"
                      shape="circle"
                    />
                  </span>
                </div>
                <div className="w-full">
                  <p className="text-start mb-2">Named Members</p>
                  <div className="flex flex-col gap-2">
                    {item.players.map((player) => (
                      <>
                        <Input
                          prefix={
                            <UserOutlined
                              style={{ color: "rgba(0,0,0,.25)" }}
                            />
                          }
                          maxLength={10}
                          showCount
                          placeholder="Name"
                          key={player.id}
                          className="border rounded-lg px-2 py-1"
                          defaultValue={player.name}
                          onBlur={(event) =>
                            updatePlayerName(
                              item.id,
                              player.id,
                              capitalString(event.target.value),
                            )
                          }
                        />
                      </>
                    ))}
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex gap-4 w-svh border rounded-lg p-2 bg-[#F8FAFC]">
              <Controller
                name="name"
                control={control}
                render={({ field }) => (
                  <Input
                    prefix={
                      <UserOutlined style={{ color: "rgba(0,0,0,.25)" }} />
                    }
                    maxLength={10}
                    showCount
                    {...field}
                    className="border rounded-lg px-2 py-1"
                    placeholder="Team Name"
                  />
                )}
              />
              <Button
                htmlType="submit"
                disabled={teams.length >= 6}
                className="border rounded-lg px-2 py-1"
                type="primary"
              >
                Add Team
              </Button>
            </div>
            <div>
              <small className="text-red-600">{errors.name?.message}</small>
            </div>
          </form>
          <div className="flex gap-2 py-2 w-svh ">
            <Settings />
            <span>Game Settings</span>
          </div>
          <div className="border rounded-lg p-5 w-svh bg-[#F8FAFC]">
            <div className="flex justify-between items-center border-b py-2">
              <span className="flex justify-center items-center gap-2">
                <RefreshCcw />
                Rounds
              </span>
              <span className="flex justify-center items-center gap-4">
                <Button
                  shape="circle"
                  type="primary"
                  icon="-"
                  disabled={gameSetting.totalRounds === 1}
                  onClick={() =>
                    setGameSettings({
                      ...gameSetting,
                      totalRounds: gameSetting.totalRounds - 1,
                    })
                  }
                />
                <span className="inline-block w-6 text-center">
                  {gameSetting.totalRounds}
                </span>
                <Button
                  shape="circle"
                  type="primary"
                  icon="+"
                  disabled={gameSetting.totalRounds === 10}
                  onClick={() =>
                    setGameSettings({
                      ...gameSetting,
                      totalRounds: gameSetting.totalRounds + 1,
                    })
                  }
                />
              </span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="flex gap-2 justify-center items-center">
                <Timer />
                Time per turn
              </span>
              <span className="flex justify-center items-center gap-2">
                <Button
                  shape="circle"
                  type="primary"
                  icon="-"
                  disabled={gameSetting.timePerTurn === 30}
                  onClick={() =>
                    setGameSettings({
                      ...gameSetting,
                      timePerTurn: gameSetting.timePerTurn - 30,
                    })
                  }
                />
                <span className="inline-block w-10 text-center">
                  {gameSetting.timePerTurn}s
                </span>
                <Button
                  shape="circle"
                  type="primary"
                  icon="+"
                  disabled={gameSetting.timePerTurn === 90}
                  onClick={() =>
                    setGameSettings({
                      ...gameSetting,
                      timePerTurn: gameSetting.timePerTurn + 30,
                    })
                  }
                />
              </span>
            </div>
          </div>
          <div>
            <Link to={`/startgame`}>
              <Button
                type="primary"
                className="border rounded-lg px-4 py-2 w-svh"
              >
                START GAME
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
