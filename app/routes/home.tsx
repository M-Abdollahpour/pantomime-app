import { useGameStore } from "~/stores/gameStore";
import type { Route } from "./+types/home";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { nanoid } from "nanoid";
import { Link } from "react-router";
import { capitalString } from "../utils/capitalString";
import { Typography } from "antd";
import { Button } from "antd";
const { Title } = Typography;

import {
  Avatar,
  AvatarBadge,
  AvatarFallback,
  AvatarImage,
} from "../components/ui/avatar";
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
    register,
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
    <div className="bg-blue-50">
      <div className="container mx-auto p-8 text-center ">
        <div className="flex flex-col gap-4 justify-center items-center">
          <Title className="w-full">PANTOMIME</Title>
          <span className="flex justify-center items-center">
            <span className="border w-36 border-red-700"></span>
            <span className="border w-36 border-blue-700"></span>
          </span>
          <p className="bg-black text-white px-6 py-1 rounded-lg rotate-x-5 -rotate-y-15">
            Great Challenge
          </p>
          <ul className="flex gap-5 flex-col `w-75`">
            {teams.map((item) => (
              <li
                key={item.id}
                className="border p-5 rounded-lg flex gap-2 flex-col items-center justify-center"
              >
                <div className="flex w-full gap-2 border-b py-2">
                  <Avatar>
                    <AvatarImage
                      src="avatars/performing art.jpeg"
                      alt="@pranathip"
                    />
                    <AvatarFallback>PP</AvatarFallback>
                  </Avatar>

                  <input
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
                    {item.playerCount}
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
                  <p className="mb-2">Named Members</p>

                  <div className="flex flex-col gap-2">
                    {item.players.map((player) => (
                      <input
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
                    ))}
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <form className="border-b pb-5" onSubmit={handleSubmit(onSubmit)}>
            <input
              {...register("name")}
              className="border rounded-lg px-2 py-1"
              placeholder="Team Name"
            />

            <button
              disabled={teams.length >= 6}
              className="border rounded-lg px-2 py-1"
              type="submit"
            >
              Add team
            </button>
            <div>
              <small>{errors.name?.message}</small>
            </div>
          </form>
          <div className="`w-75` border rounded-lg p-5">
            <h1>Game Settings</h1>
            <div className="flex justify-between border-b">
              <span>Rounds</span>
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
                <span>{gameSetting.totalRounds}</span>
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
            <div className="flex justify-between">
              <span>Time per turn</span>
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
                <span className="grow-0">{gameSetting.timePerTurn}s</span>
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
              <button className="border rounded-lg px-4 py-2">
                START GAME
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
