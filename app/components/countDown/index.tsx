import { useEffect, useRef, useState } from "react";
import { useGameStore } from "~/stores/gameStore";
import type { CountDownProps } from "~/types/componentsType";
import { playSound } from "~/utils/playSound";

export default function CountDown({
  totalTime,
  isRunning,
  onComplete,
}: CountDownProps) {
  const soundSettings = useGameStore((state) => state.soundSettings);
  const totalSeconds = totalTime;
  const [remainingSeconds, setRemainingSeconds] = useState(totalTime);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const dashOffset = 100 - (remainingSeconds / totalSeconds) * 100;
  const percentage = (remainingSeconds / totalSeconds) * 100;
  let strokeColor = "#22c55e";
  if (percentage <= 25) {
    strokeColor = "#ef4444";
  } else if (percentage <= 50) {
    strokeColor = "#f97316";
  }
  useEffect(() => {
    if (!isRunning) return;
    const intervalId = setInterval(() => {
      if (soundSettings.soundEffects) {
        audioRef.current?.pause();
        audioRef.current = playSound("/sounds/tick.wav");
      }
      setRemainingSeconds((prev) => Math.max(prev - 1, 0));
    }, 1000);
    return () => {
      clearInterval(intervalId);
      audioRef.current?.pause();
    };
  }, [isRunning, soundSettings.soundEffects]);
  useEffect(() => {
    if (remainingSeconds === 0 && isRunning) {
      audioRef.current?.pause();
      onComplete?.();
    }
  }, [remainingSeconds]);
  return (
    <svg width="160" height="160" viewBox="0 0 160 160">
      <circle
        cx="80"
        cy="80"
        r="70"
        fill="none"
        stroke="#e5e7eb"
        strokeWidth="12"
      />
      <circle
        cx="80"
        cy="80"
        r="70"
        fill="none"
        stroke={strokeColor}
        strokeWidth="12"
        pathLength="100"
        strokeDasharray="100"
        strokeDashoffset={dashOffset}
        transform="rotate(-90 80 80)"
        className="transition-all duration-700 ease-in-out"
      />
      <text
        x="80"
        y="80"
        textAnchor="middle"
        dominantBaseline="middle"
        fontSize="42"
        fill={strokeColor}
      >
        <tspan x="80" dy="-8">
          {remainingSeconds}
        </tspan>
        <tspan x="80" dy="24" fontSize="10">
          sec
        </tspan>
      </text>
    </svg>
  );
}
