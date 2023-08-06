import "@testing-library/jest-dom";
import React from "react";
import renderer from "react-test-renderer";
import { MazeProps } from "../util/types";
import Row from "../components/row";

describe("Row tests", () => {
  it("renders a row with the given props", () => {
    const walls = rowMock({ howMany: 15 });
    const aRow = renderer
      .create(<Row walls={walls} pony={"lowResTwiSp"} />)
      .toJSON();
    expect(aRow).toMatchSnapshot();
  });
});

function rowMock(overrides: { howMany: number }): MazeProps[] {
  const walls: MazeProps[] = [];
  for (let i = 0; i < overrides.howMany; i++) {
    walls.push({
      key: i,
      walls: [],
      width: 15,
      height: 15,
      isPony: i === 0,
      isDomokun: i === 1,
      isExit: i === 2,
    });
  }

  return walls;
}
