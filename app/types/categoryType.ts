import type { Id } from "./type";
export type Difficulty = "easy" | "medium" | "hard";
export const DIFFICULTY_POINTS: Record<Difficulty, number> = {
  easy: 3,
  medium: 5,
  hard: 7,
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
