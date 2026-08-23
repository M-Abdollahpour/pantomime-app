import { nanoid } from "nanoid";
import { create } from "zustand";
import type { GameStore } from "~/types/gamePantoType";
import { persist } from "zustand/middleware";
import { CATEGORIES } from "../data/categories";
import {
  DIFFICULTY_POINTS,
  MAX_REROLLS_BY_DIFFICULTY,
} from "~/types/categoryType";

export const useGameStore = create<GameStore>()(
  persist(
    (set, get) => ({
      teams: [
        {
          id: nanoid(),
          name: "Team 1",
          avatarId: 1,
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
          avatarId: 2,
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
      nextTurn: () => {
        set(({ teams, currentTeamIndex, currentRound }) => {
          const isLastTeam = currentTeamIndex === teams.length - 1;
          return {
            currentTeamIndex: isLastTeam ? 0 : currentTeamIndex + 1,
            currentRound: isLastTeam ? currentRound + 1 : currentRound,
          };
        });
      },
      addTeam: (team) => {
        set(({ teams }) => {
          if (teams.length >= 6) {
            return { teams };
          }
          return {
            teams: [...teams, { ...team, id: nanoid() }],
          };
        });
      },
      removeTeam: (id) => {
        set(({ teams }) => {
          if (teams.length <= 2) return { teams };
          return {
            teams: teams.filter((team) => team.id !== id),
          };
        });
      },
      updateTeamName: (id, name) => {
        set(({ teams }) => ({
          teams: teams.map((team) =>
            team.id === id ? { ...team, name } : team,
          ),
        }));
      },
      setGameSettings: (settings) => {
        set(() => ({
          gameSettings: settings,
        }));
      },
      updateTeamPlayerCount: (id, playerCount) => {
        const nextCount = Math.min(10, Math.max(1, playerCount));
        set(({ teams }) => ({
          teams: teams.map((team) => {
            if (team.id !== id) return team;
            const keptPlayers = team.players.slice(0, nextCount);
            const newPlayers = Array.from(
              { length: nextCount - keptPlayers.length },
              (_, index) => ({
                id: nanoid(),
                name: `Player ${keptPlayers.length + index + 1}`,
              }),
            );
            return {
              ...team,
              playerCount: nextCount,
              players: [...keptPlayers, ...newPlayers],
            };
          }),
        }));
      },
      updatePlayerName: (teamId, playerId, name) => {
        set(({ teams }) => ({
          teams: teams.map((team) =>
            team.id === teamId
              ? {
                  ...team,
                  players: team.players?.map((player) =>
                    player.id === playerId ? { ...player, name } : player,
                  ),
                }
              : team,
          ),
        }));
      },
      categories: CATEGORIES,
      usedWords: [],
      pickWord: (categoryId, difficulty) => {
        const { categories, usedWords } = get();
        const category = categories.find((c) => c.id === categoryId);
        if (!category) return null;
        const allWords = category.words[difficulty];
        const availableWords = allWords.filter(
          (word) => !usedWords.includes(word),
        );
        if (availableWords.length === 0) return null;
        const randomIndex = Math.floor(Math.random() * availableWords.length);
        const selectedWord = availableWords[randomIndex];
        set((state) => ({
          usedWords: [...state.usedWords, selectedWord],
        }));
        return selectedWord;
      },
      currentWord: null,
      currentCategoryId: null,
      currentDifficulty: null,
      rerollsUsed: 0,
      lastTurnPoints: null,
      lastTurnTeamId: null,

      setCurrentWord: (word) => set(() => ({ currentWord: word })),
      selectWord: (categoryId, difficulty) => {
        const word = get().pickWord(categoryId, difficulty);
        set(() => ({
          currentWord: word,
          currentCategoryId: categoryId,
          currentDifficulty: difficulty,
          rerollsUsed: 0,
        }));
      },
      rerollWord: () => {
        const { currentCategoryId, currentDifficulty, rerollsUsed } = get();
        if (!currentCategoryId || !currentDifficulty) return;
        const maxRerolls = MAX_REROLLS_BY_DIFFICULTY[currentDifficulty];
        if (rerollsUsed >= maxRerolls) return;
        const word = get().pickWord(currentCategoryId, currentDifficulty);
        set((state) => ({
          currentWord: word,
          rerollsUsed: state.rerollsUsed + 1,
        }));
      },
      correctGuess: () => {
        const { currentDifficulty, rerollsUsed, teams, currentTeamIndex } =
          get();
        const teamId = teams[currentTeamIndex].id;
        let points = 0;

        if (currentDifficulty) {
          points = Math.max(
            0,
            DIFFICULTY_POINTS[currentDifficulty] - rerollsUsed,
          );
          set((state) => ({
            teams: state.teams.map((team) =>
              team.id === teamId
                ? { ...team, score: team.score + points }
                : team,
            ),
          }));
        }

        set(() => ({
          currentWord: null,
          currentCategoryId: null,
          currentDifficulty: null,
          rerollsUsed: 0,
          lastTurnPoints: points,
          lastTurnTeamId: teamId,
        }));

        get().nextTurn();
      },
      skipGuess: () => {
        const { teams, currentTeamIndex } = get();
        const teamId = teams[currentTeamIndex].id;
        set(() => ({
          currentWord: null,
          currentCategoryId: null,
          currentDifficulty: null,
          rerollsUsed: 0,
          lastTurnPoints: 0,
          lastTurnTeamId: teamId,
        }));
        get().nextTurn();
      },
      resetGame: () => {
        set((state) => ({
          currentRound: 1,
          currentTeamIndex: 0,
          usedWords: [],
          currentWord: null,
          currentCategoryId: null,
          currentDifficulty: null,
          rerollsUsed: 0,
          lastTurnPoints: null,
          lastTurnTeamId: null,
          teams: state.teams.map((team) => ({ ...team, score: 0 })),
        }));
      },
      resetAll: () => {
        get().resetGame();
        set(() => ({
          gameSettings: {
            timePerTurn: 60,
            totalRounds: 3,
          },
          teams: [
            {
              id: nanoid(),
              name: "Team 1",
              avatarId: 1,
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
              avatarId: 2,
              playerCount: 2,
              score: 0,
              players: [
                { id: nanoid(), name: "Player 1" },
                { id: nanoid(), name: "Player 2" },
              ],
            },
          ],
        }));
      },
      soundSettings: {
        soundEffects: true,
        partyMusic: true,
      },
      setSoundSettings: (settings) => {
        set(() => ({
          soundSettings: settings,
        }));
      },
    }),
    {
      name: "pantomim-game-store",
    },
  ),
);
