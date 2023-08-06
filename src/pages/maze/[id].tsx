import PlayerController from "@/components/playerController";
import Row from "@/components/row";
import { MlpChars } from "@/util/constants";
import { MazeProps, Cardinals, GoalLocations } from "@/util/types";
import { useRouter } from "next/router";
import Image from "next/image";
import { useEffect, useState } from "react";
import ErrorWindow from "@/components/errorWindow";
import { constructMaze } from "@/util/maze.utils";

const Maze = () => {
  const router = useRouter();
  const mazeId = router.query.id;
  const ponyInt = router.query.pony;
  const pony = ponyInt
    ? Object.keys(MlpChars)[parseInt(ponyInt as string)]
    : "lowResRainDa";
  const [mazeRows, setMazeRows] = useState<MazeProps[][]>([]);
  const [error, setError] = useState<string | null>(null);
  const [goals, setGoals] = useState<GoalLocations>({
    domokun: null,
    pony: null,
    endPoint: null,
  });

  useEffect(() => {
    if (mazeId == null) return;
    getMazeData(mazeId as string);

    document.addEventListener("keydown", (e) => {
      switch (e.key) {
        case "ArrowUp":
          movePony("north", e);
          break;
        case "ArrowDown":
          movePony("south", e);
          break;
        case "ArrowLeft":
          movePony("west", e);
          break;
        case "ArrowRight":
          movePony("east", e);
          break;
        default:
          break;
      }
    });
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
        const rows = constructMaze(mazeProps);
        if (rows == null) {
          setError("Error creating maze, please refresh!");
        } else {
          setMazeRows(rows);
        }
      })
      .catch((err) => {
        setError(
          "Error obtaining maze, please ensure the link used was correct!"
        );
        console.log(err);
      });
  };

  const movePony = async (direction: string, e?: KeyboardEvent) => {
    if (e) e.preventDefault();
    try {
      const move = await fetch(
        `https://ponychallenge.trustpilot.com/pony-challenge/maze/${mazeId}`,
        {
          headers: { "Content-Type": "application/json" },
          method: "POST",
          body: JSON.stringify({ direction: direction }),
        }
      );
      const moveRes = await move.text();
      let moveResJson;
      try {
        moveResJson = JSON.parse(moveRes);
      } catch (error) {
        throw new Error(moveRes);
      }

      getMazeData(`${mazeId}`);
    } catch (error) {
      console.log(error);
      setError("Error moving pony!");
    }
  };

  const clearError = () => {
    setError(null);
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
        {error && <ErrorWindow error={error} closeHandler={clearError} />}
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
