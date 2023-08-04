import React from "react";
import Block from "./block/block";
import { MazeProps } from "@/util/types";

interface RowProps {
  walls: MazeProps[];
  pony: string;
}

const Row = ({ walls, pony }: RowProps) => {
  return (
    <div className="flex justify-center">
      {walls.map((cell) => {
        return <Block key={cell.key} data={cell} pony={pony} />;
      })}
    </div>
  );
};

export default Row;
