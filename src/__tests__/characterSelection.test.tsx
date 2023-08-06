import "@testing-library/jest-dom";
import React from "react";
import renderer from "react-test-renderer";
import CharacterSelection from "../components/characterSelection";

describe("charact selection snapshot test", () => {
  it("renders the character selection component", () => {
    const element = renderer
      .create(
        <CharacterSelection characterHandler={() => {}} selected={null} />
      )
      .toJSON();
    expect(element).toMatchSnapshot();
  });
});
