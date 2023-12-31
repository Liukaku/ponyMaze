export interface MazeProps {
  key: number;
  walls: Cardinals[];
  isPony: boolean;
  isDomokun: boolean;
  isExit: boolean;
  height: number;
  width: number;
}

export type Cardinals = "north" | "south" | "east" | "west";

export interface GoalLocations {
  pony: number | null;
  domokun: number | null;
  endPoint: number | null;
}

export interface ContructMazeProps {
  height: number;
  width: number;
  walls: Cardinals[][];
  pony: number[];
  domokun: number[];
  endPoint: number[];
}
