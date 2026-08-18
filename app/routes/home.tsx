import { useGameStore } from "~/stores/gameStore";
import type { Route } from "./+types/home";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { nanoid } from "nanoid";
import { Link } from "react-router";
import { capitalString } from "../utils/capitalString";

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
    <div className="container mx-auto p-8 text-center">
      <div className="flex flex-col gap-4 justify-center items-center">
        <h1 className="font-bold text-2xl">PANTOMIME</h1>
        <p>Great Challenge</p>
        <ul className="flex gap-5 flex-col `w-75`">
          {teams.map((item) => (
            <li
              key={item.id}
              className="border p-5 rounded-lg flex gap-2 flex-col items-center justify-center"
            >
              <div className="flex w-full gap-2 border-b py-2">
                <img className="border `w-8` `h-8` w-full rounded-full" />
                <input
                  className="border rounded-lg px-2 py-1"
                  type="text"
                  defaultValue={item.name}
                  onBlur={(e) =>
                    updateTeamName(item.id, capitalString(e.target.value))
                  }
                />
                {teams.length > 2 && (
                  <button
                    type="button"
                    className="text-red-500"
                    onClick={() => removeTeams(item.id)}
                  >
                    X
                  </button>
                )}
              </div>
              <div className="border-b py-2 flex w-full justify-between">
                <span>players</span>
                <span className="flex items-center gap-4">
                  <button
                    onClick={() =>
                      updateTeamPlayerCount(item.id, item.playerCount - 1)
                    }
                    type="button"
                    disabled={item.playerCount === 2}
                    className="border rounded-full"
                  >
                    -
                  </button>
                  {item.playerCount}
                  <button
                    onClick={() =>
                      updateTeamPlayerCount(item.id, item.playerCount + 1)
                    }
                    type="button"
                    disabled={item.playerCount === 10}
                    className="border rounded-full"
                  >
                    +
                  </button>
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
            <span className="flex gap-4">
              <button
                type="button"
                className="border rounded-full"
                disabled={gameSetting.totalRounds === 1}
                onClick={() =>
                  setGameSettings({
                    ...gameSetting,
                    totalRounds: gameSetting.totalRounds - 1,
                  })
                }
              >
                -
              </button>
              {gameSetting.totalRounds}
              <button
                type="button"
                className="border rounded-full"
                disabled={gameSetting.totalRounds === 10}
                onClick={() =>
                  setGameSettings({
                    ...gameSetting,
                    totalRounds: gameSetting.totalRounds + 1,
                  })
                }
              >
                +
              </button>
            </span>
          </div>
          <div className="flex justify-between">
            <span>Time per turn</span>
            <span className="flex gap-4">
              <button
                type="button"
                className="border rounded-full"
                disabled={gameSetting.timePerTurn === 30}
                onClick={() =>
                  setGameSettings({
                    ...gameSetting,
                    timePerTurn: gameSetting.timePerTurn - 30,
                  })
                }
              >
                -
              </button>
              {gameSetting.timePerTurn}s
              <button
                type="button"
                className="border rounded-full"
                disabled={gameSetting.timePerTurn === 120}
                onClick={() =>
                  setGameSettings({
                    ...gameSetting,
                    timePerTurn: gameSetting.timePerTurn + 30,
                  })
                }
              >
                +
              </button>
            </span>
          </div>
        </div>
        <div>
          <Link to={`/startgame`}>
            <button className="border rounded-lg px-4 py-2">START GAME</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
