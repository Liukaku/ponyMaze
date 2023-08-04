import React from "react";
import Image from "next/image";
import { MLPCharacters, MlpChars } from "@/util/constants";

interface CharacterSelectionProps {
  characterHandler: (selection: MLPCharacters) => void;
  selected: MLPCharacters | null;
}

function CharacterSelection({
  characterHandler,
  selected,
}: CharacterSelectionProps) {
  return (
    <div className=" grid grid-cols-2 grid-rows-3 ">
      {Object.keys(MlpChars).map((ponyUrl, n) => {
        return (
          <div
            key={n}
            className={
              selected === MlpChars[ponyUrl]
                ? "py-2 bg-pink-200 cursor-pointer border border-dotted border-black"
                : "py-2 cursor-pointer hover:bg-pink-100 duration-300 ease-in-out "
            }
            onClick={() => characterHandler(MlpChars[ponyUrl])}
          >
            <Image
              className="mx-auto "
              src={`/ponies/${ponyUrl}.png`}
              alt={""}
              width={50}
              height={50}
            />
          </div>
        );
      })}
    </div>
  );
}

export default CharacterSelection;
