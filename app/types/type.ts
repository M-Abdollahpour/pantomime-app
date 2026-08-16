export type Id = number | string;

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
};
