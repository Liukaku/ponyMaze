import CharacterSelection from "@/components/characterSelection";
import ErrorWindow from "@/components/errorWindow";
import SizeAdjuster from "@/components/sizeAdjuster";
import {
  MAX,
  MIN,
  MLPCharacters,
  MlpChars,
  XY,
  btnStyle,
} from "@/util/constants";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Home() {
  const { push } = useRouter();
  const [dimentions, setDimentions] = useState({ height: 15, width: 15 });
  const [character, setCharacter] = useState<MLPCharacters | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [difficulty, setDifficulty] = useState(0);

  const sizeHandler = (val: number, dimention: XY) => {
    if (dimention === "difficulty") {
      if (val < 0 || val > 10) return;
      setDifficulty(val);
      return;
    }
    if (val < MIN || val > MAX) return;
    setDimentions({ ...dimentions, [dimention]: val });
  };

  const createMaze = async () => {
    if (!character) {
      errorHandler("Please select a character!");
      return;
    }
    try {
      const reqBody = JSON.stringify({
        "maze-width": dimentions.width,
        "maze-height": dimentions.height,
        "maze-player-name": character,
        difficulty: difficulty,
      });

      const postRes = await fetch(
        "https://ponychallenge.trustpilot.com/pony-challenge/maze",
        {
          headers: { "Content-Type": "application/json" },
          method: "POST",
          body: reqBody,
        }
      );

      const mazeId = await postRes.json();

      push(
        `/maze/${mazeId.maze_id}?pony=${Object.values(MlpChars).indexOf(
          character
        )}`
      );
    } catch (error) {
      console.log(error);
    }
  };

  const errorHandler = (err: string) => {
    setError(err);
  };

  const characterHandler = (selection: MLPCharacters) => {
    if (selection === character) {
      setCharacter(null);
      return;
    }
    setCharacter(selection);
  };

  return (
    <div className="relative shadow-black/30 md:w-2/5 w-10/12 mt-16 mx-auto border-2 pb-10 bg-gray-300 border-b-gray-500 border-l-gray-500 border-r-gray-100 border-t-gray-100 shadow-xl">
      <div className="p-1 text-xl text-white mb-5 headerBarGrey leading-none bg-zinc-300 border-t-zinc-200 border-r-zinc-200 border-l-zinc-400 border-b-zinc-400">
        <h1 className="select-none">Create Maze</h1>
      </div>

      {error && (
        <ErrorWindow error={error} closeHandler={() => setError(null)} />
      )}

      <div className="flex text-black">
        <SizeAdjuster
          sizeHandler={sizeHandler}
          dimention="Height"
          size={dimentions.height}
        />
        <SizeAdjuster
          sizeHandler={sizeHandler}
          dimention="Width"
          size={dimentions.width}
        />
      </div>
      <div className="text-black">
        <h1 className="text-center">Select a character</h1>
        <div className="my-3 px-3 py-1 h-auto w-[99%] mx-auto bg-white  duration-100 text-black border-2 border-t-gray-500 border-r-gray-500 border-l-gray-100 border-b-gray-100">
          <CharacterSelection
            characterHandler={characterHandler}
            selected={character}
          />
        </div>
      </div>
      <div className=" justify-center flex">
        <SizeAdjuster
          sizeHandler={sizeHandler}
          dimention="Difficulty"
          size={difficulty}
        />
      </div>
      <button className={btnStyle + " mx-auto"} onClick={createMaze}>
        Create Maze
      </button>
    </div>
  );
}
