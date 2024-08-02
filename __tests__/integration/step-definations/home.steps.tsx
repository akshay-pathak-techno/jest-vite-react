import { defineFeature, loadFeature } from "jest-cucumber";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import App from "../../../src/App";

const feature = loadFeature("__tests__/integration/features/home.feature");

defineFeature(feature, (test) => {
  test("Visiting the Home Page and verifying the title", ({
    given,
    then,
  }) => {
    given("I am on the home page", () => {
      render(<App />);
    });

    then('I should see the title "Home Page Title"', () => {
      expect(screen.getByText("Vite + React")).toBeInTheDocument();
    });
  });
});
