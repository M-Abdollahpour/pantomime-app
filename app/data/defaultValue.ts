import { nanoid } from "nanoid";
import { CATEGORIES } from "./categories";

export const DEFAULT_VALUE = {
  teams: [
    {
      id: nanoid(),
      name: "Team 1",
      playerCount: 2,
      score: 0,
      players: [
        { id: nanoid(), name: "Player 1" },
        { id: nanoid(), name: "Player 2" },
      ],
    },
    {
      id: nanoid(),
      name: "Team 2",
      playerCount: 2,
      score: 0,
      players: [
        { id: nanoid(), name: "Player 1" },
        { id: nanoid(), name: "Player 2" },
      ],
    },
  ],
  gameSettings: {
    timePerTurn: 60,
    totalRounds: 3,
  },
  currentRound: 1,
  currentTeamIndex: 0,
  usedCategoryDifficulties: [],
  categories: CATEGORIES,
  usedWords: [],
  currentWord: null,
  lastTurnWord: null,
  currentCategoryId: null,
  currentDifficulty: null,
  rerollsUsed: 0,
  lastTurnCategoryId: null,
  lastTurnPoints: null,
  lastTurnTeamId: null,
  gameTitle: "PANTOMIME PARTY",
  soundSettings: {
    soundEffects: true,
    partyMusic: true,
  },
};
