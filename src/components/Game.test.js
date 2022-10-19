import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";

import Game from "./Game";

let container = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it("Game loads", () => {
  act(() => {
    render(<Game />, container);
  });
  expect(container.textContent).toBe(
    `Guess The Number Between 69 and 420!Try and guess the number I am thinking of! :DYour previous guess: Guess!Game ConfigurationLower BoundUpper Bound`
  );
});
