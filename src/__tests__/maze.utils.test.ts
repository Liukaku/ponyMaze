import { constructMaze } from "../util/maze.utils";
import { ContructMazeProps } from "../util/types";

describe("maze utils", () => {
  it("returns expected maze props", () => {
    const exampleData: ContructMazeProps = mockData();
    const maze = constructMaze(exampleData);
    expect(maze).toEqual(expected);
  });
});

// mock out a very small maze so we can test the constructMaze function
function mockData(): ContructMazeProps {
  return {
    width: 3,
    height: 3,
    walls: [
      ["west", "north"],
      ["north"],
      ["west", "north"],
      ["north"],
      ["north"],
      ["north"],
      ["north"],
      ["north"],
      ["west", "north"],
    ],
    pony: [3],
    domokun: [2],
    endPoint: [1],
  };
}

var expected = [
  [
    {
      height: 3,
      isDomokun: false,
      isExit: false,
      isPony: false,
      key: 0,
      walls: ["west", "north"],
      width: 3,
    },
    {
      height: 3,
      isDomokun: false,
      isExit: true,
      isPony: false,
      key: 1,
      walls: ["north"],
      width: 3,
    },
    {
      height: 3,
      isDomokun: true,
      isExit: false,
      isPony: false,
      key: 2,
      walls: ["west", "north", "east"],
      width: 3,
    },
  ],
  [
    {
      height: 3,
      isDomokun: false,
      isExit: false,
      isPony: true,
      key: 3,
      walls: ["north"],
      width: 3,
    },
    {
      height: 3,
      isDomokun: false,
      isExit: false,
      isPony: false,
      key: 4,
      walls: ["north"],
      width: 3,
    },
    {
      height: 3,
      isDomokun: false,
      isExit: false,
      isPony: false,
      key: 5,
      walls: ["north", "east"],
      width: 3,
    },
  ],
  [
    {
      height: 3,
      isDomokun: false,
      isExit: false,
      isPony: false,
      key: 6,
      walls: ["north", "south"],
      width: 3,
    },
    {
      height: 3,
      isDomokun: false,
      isExit: false,
      isPony: false,
      key: 7,
      walls: ["north", "south"],
      width: 3,
    },
    {
      height: 3,
      isDomokun: false,
      isExit: false,
      isPony: false,
      key: 8,
      walls: ["west", "north", "south", "east"],
      width: 3,
    },
  ],
];
