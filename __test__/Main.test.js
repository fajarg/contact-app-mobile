import React from "react";
import { render, screen } from "@testing-library/react-native";
import Main from "../screens/Main";
import { renderWithProviders } from "./test-utils";

test("navbar component should render", () => {
  renderWithProviders(<Main />);
  const element = screen.getByText(/contact app/i);
  expect(element).toBeTruthy();
});

test("button new contact should show", () => {
  renderWithProviders(<Main />);
  const button = screen.getByText(/new contact/i);
  expect(button).toBeTruthy();
});
