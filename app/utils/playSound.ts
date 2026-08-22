export function playSound(src: string): HTMLAudioElement {
  const audio = new Audio(src);
  audio.play().catch(() => {});
  return audio;
}
