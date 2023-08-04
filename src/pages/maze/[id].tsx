import PlayerController from "@/components/playerController";
import Row from "@/components/row";
import { MlpChars } from "@/util/constants";
import { MazeProps, Cardinals, GoalLocations } from "@/util/types";
import { useRouter } from "next/router";
import Image from "next/image";
import React, { use, useEffect, useState } from "react";

const Maze = () => {
  const router = useRouter();
  const mazeId = router.query.id;
  const ponyInt = router.query.pony;
  const pony = ponyInt
    ? Object.keys(MlpChars)[parseInt(ponyInt as string)]
    : "lowResRainDa";
  const [mazeRows, setMazeRows] = useState<MazeProps[][]>([]);
  const [goals, setGoals] = useState<GoalLocations>({
    domokun: null,
    pony: null,
    endPoint: null,
  });
  useEffect(() => {
    if (!mazeId) return;
    getMazeData(mazeId as string);
  }, [mazeId]);

  const getMazeData = (mazeId: string) => {
    fetch(`https://ponychallenge.trustpilot.com/pony-challenge/maze/${mazeId}`)
      .then((res) => res.text())
      .then((res) => {
        const mazeResData = JSON.parse(res);
        const mazeProps = {
          width: mazeResData.size[0],
          height: mazeResData.size[1],
          walls: mazeResData.data,
          pony: mazeResData.pony,
          domokun: mazeResData.domokun,
          endPoint: mazeResData["end-point"],
        };
        setGoals({
          domokun: mazeResData.domokun[0],
          pony: mazeResData.pony[0],
          endPoint: mazeResData["end-point"][0],
        });
        constructMaze(mazeProps);
      })
      .catch((err) => console.log(err));
  };

  const constructMaze = (mazeDataParam: any) => {
    if (Object.keys(mazeDataParam).length === 0) return;
    const rows: MazeProps[][] = [];

    let id = 0;
    const { height, width, walls, pony, domokun, endPoint } = mazeDataParam;

    for (let i = 0; i < height; i++) {
      const row: MazeProps[] = [];
      for (let j = 0; j < width; j++) {
        const blockData: MazeProps = {
          key: id,
          walls: walls[id] as Cardinals[],
          isPony: id === pony[0] ? true : false,
          isDomokun: id === domokun[0] ? true : false,
          isExit: id === endPoint[0] ? true : false,
          height: parseInt(height),
          width: parseInt(width),
        };
        if (i === height - 1) {
          blockData.walls.push("south");
        }
        if (j === width - 1) {
          blockData.walls.push("east");
        }

        row.push(blockData);
        id++;
      }
      rows.push(row);
    }
    setMazeRows(rows);
  };

  const movePony = async (direction: string) => {
    await fetch(
      `https://ponychallenge.trustpilot.com/pony-challenge/maze/${mazeId}`,
      {
        headers: { "Content-Type": "application/json" },
        method: "POST",
        body: JSON.stringify({ direction: direction }),
      }
    );
    getMazeData(`${mazeId}`);
  };

  const returnToSender = () => {
    router.push("/");
  };

  return (
    <div className="mx-auto w-11/12 mt-20">
      <div className=" shadow-black/30 relative md:w-3/5 mdw-11/12 mt-16 mx-auto border-2 pb-0.5 bg-gray-300 border-b-gray-500 border-l-gray-500 border-r-gray-100 border-t-gray-100 shadow-xl">
        <div className="p-1 text-xl flex text-white mb-5 headerBarGrey leading-none bg-zinc-300 border-t-zinc-200 border-r-zinc-200 border-l-zinc-400 border-b-zinc-400">
          <Image
            className="mx-1 bg-white"
            src={`/domo.png`}
            alt={""}
            width={20}
            height={20}
            quality={100}
          />
          <h1 className="select-none">HelpThePony.exe</h1>
        </div>
        {goals.pony === goals.endPoint && (
          <div className="my-3 px-3 py-1 justify-center h-auto w-[98%] mx-auto bg-black  duration-100 text-black border-2 border-t-gray-500 border-r-gray-500 border-l-gray-100 border-b-gray-100">
            <p className=" select-none pt-36 pb-10 text-center text-white">
              Hooray!
            </p>
            <button
              onClick={() => {
                returnToSender();
              }}
              className=" select-none mb-24 mx-auto justify-center flex w-1/12 hover:bg-white hover:text-black text-white"
            >
              Play again?
            </button>
          </div>
        )}
        {goals.pony === goals.domokun && (
          <div className="  my-3 px-3 py-1 h-auto w-[98%] mx-auto bg-black  duration-100 text-black border-2 border-t-gray-500 border-r-gray-500 border-l-gray-100 border-b-gray-100">
            <p className=" select-none pt-36 pb-10 text-center text-white">
              You've been caught!
            </p>
            <button
              onClick={() => {
                returnToSender();
              }}
              className=" select-none mb-24 mx-auto justify-center flex w-1/12 hover:bg-white hover:text-black text-white"
            >
              Try again?
            </button>
          </div>
        )}
        {goals.pony !== goals.domokun && goals.pony !== goals.endPoint && (
          <div className="my-3 px-3 py-1 h-auto w-[98%] mx-auto bg-black  duration-100 text-black border-2 border-t-gray-500 border-r-gray-500 border-l-gray-100 border-b-gray-100">
            {mazeRows.map((row, i) => {
              return <Row key={i} walls={row} pony={pony} />;
            })}
          </div>
        )}
      </div>
      <PlayerController movePlayer={movePony} />
    </div>
  );
};

export default Maze;
