import type { Id } from "./gamePantoType";
export type Difficulty = "easy" | "medium" | "hard";
export const DIFFICULTY_POINTS: Record<Difficulty, number> = {
  easy: 3,
  medium: 5,
  hard: 7,
};
export const MAX_REROLLS_BY_DIFFICULTY: Record<Difficulty, number> = {
  easy: 2,
  medium: 3,
  hard: 3,
};
export type Category = {
  id: Id;
  name: string;
  words: {
    easy: string[];
    medium: string[];
    hard: string[];
  };
};
