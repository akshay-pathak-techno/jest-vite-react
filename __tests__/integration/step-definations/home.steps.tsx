import React from "react";
import { defineFeature, loadFeature } from "jest-cucumber";
import "@testing-library/jest-dom";
import { render, screen,act } from "@testing-library/react";
import Home from "../../../src/Home";

jest.useFakeTimers(); // Use fake timers globally

const feature = loadFeature("__tests__/integration/features/home.feature");

defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.useFakeTimers();    
  });
  test("Visiting the Home Page and verifying the title", ({ given, then }) => {
    given("I am on the home page", () => {
      render(<Home />);
    });

    then('I should see the title "Dashboard"', () => {
      act(() => {
        jest.advanceTimersByTime(3000); // Fast-forward time by 3 seconds
      });
      expect(screen.getByText("Dashboard")).toBeInTheDocument();
    });
  });
  afterEach(() => {
    jest.useRealTimers(); // Restore real timers after each test
  });
});
