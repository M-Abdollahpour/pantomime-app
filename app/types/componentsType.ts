import { type Control, type FieldErrors } from "react-hook-form";
import type { Team } from "./defaultValueType";
import type { Id } from "./gameStoreType";
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
