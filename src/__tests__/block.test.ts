import { Cardinals } from "..//util/types";
import { assignClasses } from "../components/block/block.utils";

describe("block utils", () => {
  it("returns expected wall classes", () => {
    const block = generateBlock();
    expect(block).toEqual([
      "text-white",
      "border-t-2 border-white",
      "border-l-2 border-white",
    ]);
  });

  it("returns expected three wall classes", () => {
    const block = generateBlock({ walls: ["north", "south", "east"] });
    expect(block).toEqual([
      "text-white",
      "border-t-2 border-white",
      "border-b-2 border-white",
      "border-r-2 border-white",
    ]);
  });

  it("returns expected four wall classes", () => {
    const block = generateBlock({ walls: ["north", "south", "east", "west"] });
    expect(block).toEqual([
      "text-white",
      "border-t-2 border-white",
      "border-b-2 border-white",
      "border-r-2 border-white",
      "border-l-2 border-white",
    ]);
  });

  it("returns expected walls and pony classes", () => {
    const block = generateBlock({
      walls: ["south", "east"],
      isPony: true,
    });
    expect(block).toEqual([
      "text-white",
      "border-b-2 border-white",
      "border-r-2 border-white",
      "bg-pink-200/80",
    ]);
  });

  it("returns expected walls and domokun classes", () => {
    const block = generateBlock({
      walls: ["north", "south"],
      isDomokun: true,
    });
    expect(block).toEqual([
      "text-white",
      "border-t-2 border-white",
      "border-b-2 border-white",
      "bg-red-800/80",
    ]);
  });

  it("returns expected walls and exit classes", () => {
    const block = generateBlock({
      walls: ["east", "west"],
      isExit: true,
    });

    expect(block).toEqual([
      "text-white",
      "border-r-2 border-white",
      "border-l-2 border-white",
      "bg-yellow-200/80",
    ]);
  });
});

interface BlockMock {
  walls?: Cardinals[];
  isPony?: boolean;
  isDomokun?: boolean;
  isExit?: boolean;
}

function blockMock(overrides?: BlockMock) {
  return {
    walls: ["north", "west"],
    isPony: false,
    isDomokun: false,
    isExit: false,
    ...overrides,
  };
}

function generateBlock(overrides?: BlockMock) {
  const mocks = blockMock(overrides);
  const block = assignClasses(
    mocks.walls as Cardinals[],
    mocks.isPony,
    mocks.isDomokun,
    mocks.isExit
  );
  return block;
}
