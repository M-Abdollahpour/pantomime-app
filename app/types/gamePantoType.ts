import type { Category, Difficulty } from "./categoryType";
import { type Control, type FieldErrors } from "react-hook-form";
export type CountDownProps = {
  totalTime: number;
  isRunning: boolean;
  onComplete?: () => void;
};
export type GameSettingProps = {
  title: string;
  icon: React.ReactNode;
  value: number;
  min: number;
  max: number;
  step: number;
  unit?: string;
  onChange: (newValue: number) => void;
};

export type FormAddTeamProps = {
  onSubmit: () => void;
  control: Control<TeamFormValues>;
  errors: FieldErrors<TeamFormValues>;
  isMaxTeamsReached: boolean;
};
export type TeamFormValues = {
  name: string;
};
export type TeamItemProps = {
  title: string;
  teams: Team[];
  onUpdateTeamName: (id: Id, name: string) => void;
  onUpdateTeamPlayerCount: (id: Id, playerCount: number) => void;
  onUpdatePlayerName: (teamId: Id, playerId: Id, name: string) => void;
  onRemoveTeam: (id: Id) => void;
};
export type Id = string;
export type Player = {
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
export type SoundSettings = {
  soundEffects: boolean;
  partyMusic: boolean;
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
  lastTurnWord: string | null;
  lastTurnCategoryId: Id | null;
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
  soundSettings: SoundSettings;
  setSoundSettings: (settings: SoundSettings) => void;
  resetGame: () => void;
  resetAll: () => void;
  usedCategoryDifficulties: string[];
};
