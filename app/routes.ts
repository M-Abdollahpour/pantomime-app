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
    route("pickword/starttimer", "routes/StartTimer.tsx"),
  ]),
] satisfies RouteConfig;
