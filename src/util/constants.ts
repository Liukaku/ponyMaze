export type XY = "height" | "width" | "difficulty";

export type MLPCharacters =
  | "Twilight Sparkle"
  | "Rainbow Dash"
  | "Pinkie Pie"
  | "Rarity"
  | "Applejack"
  | "Fluttershy";

export const MAX = 25;
export const MIN = 15;

export const MlpChars: Record<string, MLPCharacters> = {
  lowResTwiSp: "Twilight Sparkle",
  lowResRainDa: "Rainbow Dash",
  lowResPinPi: "Pinkie Pie",
  lowResRari: "Rarity",
  lowResAppJa: "Applejack",
  lowFluShy: "Fluttershy",
};

export const btnStyle =
  "shadow-sm shadow-black select-none max-h-12 w-auto cursor-pointer text-black items-center flex px-2 my-3 border-2 bg-gray-300 hover:bg-gray-400 active:bg-gray-600 border-b-gray-500 border-l-gray-500 border-r-gray-100 border-t-gray-100 active:border-t-gray-700 active:border-r-gray-700 active:border-l-gray-200 active:border-b-gray-200";
