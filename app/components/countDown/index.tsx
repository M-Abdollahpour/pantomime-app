import { useEffect, useState } from "react";
import type { CountDownProps } from "~/types/type";

export default function CountDown({ totalTime, isRunning }: CountDownProps) {
  const totalSeconds = totalTime;
  const [remainingSeconds, setRemainingSeconds] = useState(totalTime);
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
      setRemainingSeconds((prev) => Math.max(prev - 1, 0));
    }, 1000);
    return () => clearInterval(intervalId);
  }, [isRunning]);

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
        fontSize="32"
        fill="#111827"
      >
        {remainingSeconds}s
      </text>
    </svg>
  );
}
