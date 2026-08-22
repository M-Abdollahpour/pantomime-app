import type { Route } from "./+types/home";
import MainMenu from "./MainMenu";
export function meta({}: Route.MetaArgs) {
  return [{ title: "Pantomime" }];
}

export default function Home() {
  return <MainMenu />;
}
