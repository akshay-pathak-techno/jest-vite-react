import React, { useEffect } from "react";
import { defineFeature, loadFeature } from "jest-cucumber";
import "@testing-library/jest-dom";
import { render, screen, act } from "@testing-library/react";
import Home from "../../../src/Home";
import { Provider, useSetAtom } from "jotai";
import { userAtom } from "../../../src/store";
import { UserRoleProvider } from "../../../src/context/UserRoleContext";

jest.useFakeTimers(); // Use fake timers globally

const feature = loadFeature("__tests__/integration/features/home.feature");

// eslint-disable-next-line react-refresh/only-export-components
const InitialStateProvider = ({ initialValues, children }) => {
  return (
    <Provider>
      {initialValues.map(([atom, value]) => (
        <InitialAtomState key={atom.toString()} atom={atom} value={value} />
      ))}
      {children}
    </Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
const InitialAtomState = ({ atom, value }) => {
  const setAtom = useSetAtom(atom);

  useEffect(() => {
    setAtom(value);
  }, [setAtom, value]);

  return null;
};


defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.useFakeTimers();
  });
  test("Visiting the Home Page and verifying the title", ({ given, then }) => {
    given("I am on the home page", () => {
      render(
        <InitialStateProvider initialValues={[[userAtom, {
          name:"John Doe"
        }]]} >
          <UserRoleProvider initialRole="user">
          <Home />
          </UserRoleProvider>
        </InitialStateProvider>,
      );
    });

    then('I should see the title "Dashboard"', () => {
      act(() => {
        jest.advanceTimersByTime(3000); // Fast-forward time by 3 seconds
      });
      expect(screen.getByText("Dashboard")).toBeInTheDocument();
      expect(screen.getByText("John Doe")).toBeInTheDocument();
      expect(screen.getByTestId("user-role")).toHaveTextContent('user');
    });
  });
  afterEach(() => {
    jest.useRealTimers(); // Restore real timers after each test
  });
});
