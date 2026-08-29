import type { Id } from "./gameStoreType";
type Player = {
  id: Id;
  name: string;
};
export type Team = {
  id: Id;
  name: string;
  playerCount: number;
  players: Player[];
  score: number;
};
export type GameSettings = {
  timePerTurn: number;
  totalRounds: number;
};
