import { nanoid } from "nanoid";
import { create } from "zustand";
import type { GameStore } from "~/types/type";
import { persist } from "zustand/middleware";

export const useGameStore = create<GameStore>()(
  persist(
    (set) => ({
      teams: [
        {
          id: nanoid(),
          name: "Team 1",
          avatarId: 1,
          playerCount: 2,
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
    }),
    {
      name: "pantomim-game-store",
    },
  ),
);
