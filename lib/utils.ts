import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function secondsToFilmDuration(seconds: number) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);

  const formattedHours = hours > 0 ? `${hours} ${hours === 1 ? 'hour' : 'hours'}` : '';
  const formattedMinutes = minutes > 0 ? `${minutes} ${minutes === 1 ? 'minute' : 'minutes'}` : '';

  const parts = [formattedHours, formattedMinutes].filter(Boolean);
  return parts.join(' ');
}