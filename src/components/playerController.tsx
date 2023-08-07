import { btnStyle } from "@/util/constants";
import React from "react";

interface PlayerControllerProps {
  movePlayer: (direction: string) => void;
}
const PlayerController = ({ movePlayer }: PlayerControllerProps) => {
  const btnNoMargin = btnStyle.replace("my-3", "my-0");
  return (
    <div className=" shadow-black/30 sticky bottom-10 md:w-1/6 w-1/2 md:ml-1 mx-auto mt-16  border-2 md:pb-5 pb-1 bg-gray-300 border-b-gray-500 border-l-gray-500 border-r-gray-100 border-t-gray-100 shadow-xl">
      <div className="p-1 text-xl text-white mb-5 headerBarGrey leading-none bg-zinc-300 border-t-zinc-200 border-r-zinc-200 border-l-zinc-400 border-b-zinc-400">
        <h1 className="select-none">Controls.exe</h1>
      </div>
      <div className="grid grid-cols-2 grid-rows-3 mx-2">
        <button
          className={btnNoMargin + " py-1 col-span-2 justify-center"}
          onClick={() => movePlayer("north")}
        >
          Up
        </button>
        <button
          className={btnNoMargin + " w-1/2 py-1 justify-center"}
          onClick={() => movePlayer("west")}
        >
          Left
        </button>
        <button
          className={btnNoMargin + " py-1 w-full justify-center"}
          onClick={() => movePlayer("east")}
        >
          Right
        </button>
        <button
          className={btnNoMargin + " py-1 col-span-2 justify-center"}
          onClick={() => movePlayer("south")}
        >
          Down
        </button>
      </div>
      <p className="text-black text-center my-2">
        (or use the arrow keys on your keyboard)
      </p>
    </div>
  );
};

export default PlayerController;
