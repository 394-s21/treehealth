import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import TreeDetailScreen from "../plots/TreeDetailScreen";

it("collapsible button show up", () => {
  const { getByTestId } = render(<TreeDetailScreen />);

  expect(getByTestId("button")).toBeDefined();
});

it("tree info shows up when button clicked", () => {
  const { getByTestId } = render(<TreeDetailScreen />);

  //expect(getByTestId("button")).toBeDefined();
  fireEvent.press(getByTestId("button"));
  expect(getByTestId("treeInfo")).toBeDefined();
});

it("tree info shows up when button clicked odd number of times", () => {
  const { getByTestId } = render(<TreeDetailScreen />);

  //expect(getByTestId("button")).toBeDefined();
  fireEvent.press(getByTestId("button"));
  fireEvent.press(getByTestId("button"));
  fireEvent.press(getByTestId("button"));
  expect(getByTestId("treeInfo")).toBeDefined();
});
