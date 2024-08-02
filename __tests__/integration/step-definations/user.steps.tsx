import { defineFeature, loadFeature } from "jest-cucumber";
import "@testing-library/jest-dom";
import { render, screen, waitFor } from "@testing-library/react";
import Users from "../../../src/Users";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MemoryRouter } from "react-router-dom";
import React from "react";

// Mock fetch with different responses
global.fetch = jest.fn();

const feature = loadFeature("__tests__/integration/features/users.feature");

defineFeature(feature, (test) => {
  let queryClient: QueryClient;

  beforeEach(() => {
    queryClient = new QueryClient();
  });

  test("Displaying a list of users", ({ given, when, then }) => {
    given("I am on the users page", async () => {
      // Mock successful fetch response
      (global.fetch as jest.Mock).mockImplementation((url: string) => {
        if (url === "https://jsonplaceholder.typicode.com/users") {
          return Promise.resolve({
            ok: true,
            status: 200,
            json: () =>
              Promise.resolve([
                {
                  id: 1,
                  name: "Leanne Graham",
                  email: "Sincere@april.biz",
                  phone: "1-770-736-8031 x56442",
                },
              ]),
          } as Response);
        }
        return Promise.reject(new Error("Not found"));
      });

      render(
        <QueryClientProvider client={queryClient}>
          <MemoryRouter>
            <Users />
          </MemoryRouter>
        </QueryClientProvider>,
      );
    });

    when("the data is loaded", async () => {
      await waitFor(() => expect(global.fetch as jest.Mock).toHaveBeenCalled());
    });

    then(
      "I should see a table with users' names, emails, and phones",
      async () => {
        await waitFor(() => {
          expect(screen.getByText("Leanne Graham")).toBeInTheDocument();
          expect(screen.getByText("Sincere@april.biz")).toBeInTheDocument();
          expect(screen.getByText("1-770-736-8031 x56442")).toBeInTheDocument();
        });
      },
    );
  });

  test("Handling API failure with 404 Not Found", ({ given, when, then }) => {
    given("I am on the users page", async () => {
      // Mock fetch 404 Not Found response
      (global.fetch as jest.Mock).mockImplementation(() => {
        return Promise.resolve({
          ok: false,
          status: 404,
          json: () => Promise.resolve({ message: "Not Found" }),
        } as Response);
      });

      render(
        <QueryClientProvider client={queryClient}>
          <MemoryRouter>
            <Users />
          </MemoryRouter>
        </QueryClientProvider>,
      );
    });

    when("the data fails to load", async () => {
      await waitFor(() => expect(global.fetch as jest.Mock).toHaveBeenCalled());
    });

    then(
      "I should see an error message indicating failure to load data",
      async () => {
        await waitFor(() => {
          expect(screen.getByText("Error loading users")).toBeInTheDocument();
        });
      },
    );
  });
});
