import type { Category, Difficulty } from "./categoryType";
export type CountDownProps = {
  totalTime: number;
  isRunning: boolean;
};
export type Id = string;
export type Player = {
  id: Id;
  name: string;
};
export type Team = {
  id: Id;
  name: string;
  avatarId: number;
  playerCount: number;
  players: Player[];
  score: number;
};
export type GameSettings = {
  timePerTurn: number;
  totalRounds: number;
};
export type GameStore = {
  teams: Team[];
  gameSettings: GameSettings;
  addTeam: (team: Omit<Team, "id">) => void;
  removeTeam: (id: Id) => void;
  setGameSettings: (settings: GameSettings) => void;
  updateTeamName: (id: Id, name: string) => void;
  updateTeamPlayerCount: (id: Id, playerCount: number) => void;
  updatePlayerName: (teamId: Id, playerId: Id, name: string) => void;
  currentRound: number;
  currentTeamIndex: number;
  nextTurn: () => void;
  categories: Category[];
  usedWords: string[];
  pickWord: (categoryId: Id, difficulty: Difficulty) => string | null;
  currentWord: string | null;
  setCurrentWord: (word: string | null) => void;
  currentCategoryId: Id | null;
  currentDifficulty: Difficulty | null;
  rerollsUsed: number;
  selectWord: (categoryId: Id, difficulty: Difficulty) => void;
  rerollWord: () => void;
  correctGuess: () => void;
  skipGuess: () => void;
  lastTurnPoints: number | null;
  lastTurnTeamId: Id | null;
  resetGame: () => void;
};
