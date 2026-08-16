import type { Id } from "./type";

export type Avatar = {
  id: Id;
  imageUrl: string;
};

export const avatars: Avatar[] = Array.from({ length: 50 }, (_, i) => ({
  id: i + 1,
  imageUrl: `/avatars/avatar-${i + 1}.png`,
}));
