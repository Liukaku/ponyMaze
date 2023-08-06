import { Cardinals } from "@/util/types";

export const assignClasses = (
  walls: Cardinals[],
  isPony: boolean,
  isDomokun: boolean,
  isExit: boolean
) => {
  const classes = [`text-white`];
  const wallBorders = {
    north: "border-t-2 border-white",
    south: "border-b-2 border-white",
    east: "border-r-2 border-white",
    west: "border-l-2 border-white",
  };

  for (const wall in walls) {
    classes.push(wallBorders[walls[wall]]);
  }

  isPony && classes.push("bg-pink-200/80");
  isDomokun && classes.push("bg-red-800/80");
  isExit && classes.push("bg-yellow-200/80");

  return classes;
};
