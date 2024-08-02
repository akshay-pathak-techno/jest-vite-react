import { defineFeature, loadFeature } from "jest-cucumber";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Home from "../../../src/Home";

const feature = loadFeature("__tests__/integration/features/home.feature");

defineFeature(feature, (test) => {
  test("Visiting the Home Page and verifying the title", ({
    given,
    then,
  }) => {
    given("I am on the home page", () => {
      render(<Home />);
    });

    then('I should see the title "Dashboard"', () => {
      expect(screen.getByText("Dashboard")).toBeInTheDocument();
    });
  });
});
