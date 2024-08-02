import { defineFeature, loadFeature } from "jest-cucumber";
import "@testing-library/jest-dom";
import { render, screen, fireEvent, act } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import LoginForm from "../../../src/LoginForm";
import React from "react";

const renderLoginForm = () => {
  return render(
    <MemoryRouter>
      <LoginForm />
    </MemoryRouter>,
  );
};

const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

const feature = loadFeature("__tests__/integration/features/login.feature");

defineFeature(feature, (test) => {
  test("Visiting the Login Page and verifying the form elements", ({
    given,
    then,
  }) => {
    given("I am on the login page", () => {
      renderLoginForm();
    });

    then("I should see the login form with email and password fields", () => {
      expect(screen.getByLabelText("Email")).toBeInTheDocument();
      expect(screen.getByLabelText("Password")).toBeInTheDocument();
    });

    then('I should see a submit button with the text "Login"', () => {
      expect(screen.getByRole("button", { name: "Login" })).toBeInTheDocument();
    });
  });

  test("Submitting the login form with an invalid email", ({
    given,
    when,
    then,
  }) => {
    given("I am on the login page", () => {
      renderLoginForm();
    });

    when("I enter an invalid email in the email field", async () => {
      await act(async () => {
        fireEvent.change(screen.getByLabelText("Email"), {
          target: { value: "invalid-email" },
        });
      });
    });

    when("I enter a valid password in the password field", async () => {
      await act(async () => {
        fireEvent.change(screen.getByLabelText("Password"), {
          target: { value: "validPassword123" },
        });
      });
    });

    when("I click the submit button", async () => {
      await act(async () => {
        fireEvent.submit(screen.getByRole("button", { name: "Login" }));
      });
    });

    then("I should see an error message for the email field", () => {
      expect(screen.getByText("Invalid email address")).toBeInTheDocument();
    });
  });

  test("Submitting the login form with a password less than 6 characters", ({
    given,
    when,
    then,
  }) => {
    given("I am on the login page", () => {
      renderLoginForm();
    });

    when("I enter a valid email in the email field", async () => {
      await act(async () => {
        fireEvent.change(screen.getByLabelText("Email"), {
          target: { value: "test@example.com" },
        });
      });
    });

    when(
      "I enter a password less than 6 characters in the password field",
      async () => {
        await act(async () => {
          fireEvent.change(screen.getByLabelText("Password"), {
            target: { value: "123" },
          });
        });
      },
    );

    when("I click the submit button", async () => {
      await act(async () => {
        fireEvent.submit(screen.getByRole("button", { name: "Login" }));
      });
    });

    then("I should see an error message for the password field", () => {
      expect(
        screen.getByText("Password must be at least 6 characters"),
      ).toBeInTheDocument();
    });
  });

  test("Submitting the login form with a valid email and password", ({
    given,
    when,
    then,
  }) => {
    given("I am on the login page", () => {
      renderLoginForm();
    });

    when("I enter a valid email in the email field", async () => {
      await act(async () => {
        fireEvent.change(screen.getByLabelText("Email"), {
          target: { value: "test@example.com" },
        });
      });
    });

    when("I enter a valid password in the password field", async () => {
      await act(async () => {
        fireEvent.change(screen.getByLabelText("Password"), {
          target: { value: "validPassword123" },
        });
      });
    });

    when("I click the submit button", async () => {
      await act(async () => {
        fireEvent.submit(screen.getByRole("button", { name: "Login" }));
      });
    });

    then("I should be redirected to the dashboard", () => {
      expect(mockNavigate).toHaveBeenCalledWith("/");
    });
  });
});
