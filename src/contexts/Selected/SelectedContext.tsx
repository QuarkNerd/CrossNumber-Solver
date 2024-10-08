import { Coor } from "../../types";
import createContextSlice from "../CreateContextSlice/CreateContextSlice";
const size = 12;
const initialSelected: SelectedMap = Array(size)
  .fill(undefined)
  .map(() => Array(size).fill(false));

const TOGGLE = "TOGGLE";

type SelectedMap = boolean[][];
type SelectedAction = {
  type: typeof TOGGLE;
} & Coor;

// TODO add a change size
const selectedReducer = (initial: SelectedMap, action: SelectedAction) => {
  switch (action.type) {
    case TOGGLE:
      initial[action.y][action.x] = !initial[action.y][action.x];
      break;
  }
};

export const toggleSelcted = (x: number, y: number): SelectedAction => ({
  type: TOGGLE,
  x,
  y,
});

const slice = createContextSlice("selected", initialSelected, selectedReducer);

export const { useSelected, useSelectedDispatch, SelectedContextProvider } =
  slice;
