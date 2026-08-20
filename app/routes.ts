import {
  type RouteConfig,
  index,
  route,
  prefix,
} from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  ...prefix("/startgame", [
    index("routes/StartGame.tsx"),
    route("pickword", "routes/PickWord.tsx"),
    route("starttimer", "routes/StartTimer.tsx"),
    route("turnteam", "routes/TurnTeam.tsx"),
    route("gameover", "routes/GameOver.tsx"),
  ]),
] satisfies RouteConfig;
