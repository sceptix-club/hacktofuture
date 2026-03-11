import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const coreTeamPrefix =
  "https://raw.githubusercontent.com/sceptix-club/htf-4-assets/main/core_team/";

// export const wallImagesPrefix =
//   "https://cdn.jsdelivr.net/gh/sceptix-club/htf-4-assets@main/wall_images/";

export const wallImagesPrefix =
  "https://raw.githubusercontent.com/sceptix-club/htf-4-assets/main/wall_images/";

export const rootPrefix =
  "https://raw.githubusercontent.com/sceptix-club/htf-4-assets/main/";
