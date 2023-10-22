import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function secondsToFilmDuration(seconds: number) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  const formattedHours = hours > 0 ? `${hours} ${hours === 1 ? 'hour' : 'hours'}` : '';
  const formattedMinutes = minutes > 0 ? `${minutes} ${minutes === 1 ? 'minute' : 'minutes'}` : '';
  const formattedSeconds = `${remainingSeconds} ${remainingSeconds === 1 ? 'second' : 'seconds'}`;

  const parts = [formattedHours, formattedMinutes, formattedSeconds].filter(Boolean);
  return parts.join(' ');
}