import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const coreTeamPrefix =
  "https://raw.githubusercontent.com/sceptix-club/htf-4-assets/main/core_team/";
