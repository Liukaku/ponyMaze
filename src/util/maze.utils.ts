import { MazeProps, Cardinals, ContructMazeProps } from "./types";

export function constructMaze(
  mazeDataParam: ContructMazeProps
): MazeProps[][] | undefined {
  if (Object.keys(mazeDataParam).length === 0) return;
  const rows: MazeProps[][] = [];

  let id = 0;
  const { height, width, walls, pony, domokun, endPoint } = mazeDataParam;

  for (let i = 0; i < height; i++) {
    const row: MazeProps[] = [];
    for (let j = 0; j < width; j++) {
      const blockData: MazeProps = {
        key: id,
        walls: walls[id],
        isPony: id === pony[0] ? true : false,
        isDomokun: id === domokun[0] ? true : false,
        isExit: id === endPoint[0] ? true : false,
        height: height,
        width: width,
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
  return rows;
}
