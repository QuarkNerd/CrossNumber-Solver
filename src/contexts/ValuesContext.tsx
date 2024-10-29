import hash from "object-hash";
import createContextSlice from "./CreateContextSlice";
import { getKey } from "../utils";

const TOGGLE_VALUE = "TOGGLE_VALUE";
const TOGGLE_ENABLED = "TOGGLE_ENABLED";
const DISABLED = "DISABLED";
const SET_WHOLE = "SET_WHOLE";

export type Digit = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

export type ValueMap = {
  [key: string]: Set<Digit> | typeof DISABLED | undefined;
};
type ValuesAction =
  | {
      type: "TOGGLE_VALUE";
      value: Digit;
      squareKeys: Set<string>;
    }
  | {
      type: "TOGGLE_ENABLED";
      squareKeys: Set<string>;
    }
  | {
      type: "SET_WHOLE";
      value: ValueMap;
    };

const valuesReducer = (initial: ValueMap, action: ValuesAction) => {
  if (action.type === "SET_WHOLE") {
    for (const key in initial) {
      delete initial[key];
    }
    for (const key in action.value) {
      initial[key] = action.value[key];
    }
    return;
  }
  action.squareKeys.forEach((sqKey) => {
    switch (action.type) {
      case TOGGLE_ENABLED:
        if (initial[sqKey] === DISABLED) {
          delete initial[sqKey];
          return;
        }
        initial[sqKey] = DISABLED;
        break;
      case TOGGLE_VALUE:
        if (initial[sqKey] === DISABLED) {
          return;
        }
        if (initial[sqKey] === undefined) {
          initial[sqKey] = new Set([action.value]);
          return;
        }
        const set = initial[sqKey] as Set<Digit>;
        if (set.has(action.value)) {
          set.delete(action.value);
        } else {
          set.add(action.value);
        }
    }
  });
};

const slice = createContextSlice("values", {} as ValueMap, valuesReducer);

export const {
  useValuesSelector,
  ValuesContextProvider,
  useValuesGetCurrentValue,
} = slice;
const useValueDispatch = slice.useValuesDispatch;

export const useClueNumber = (key: string) =>
  useValuesSelector((st) => getClueStartingPositions(12, st).indexOf(key));

export const useToggleEnable = () => {
  const dispatch = useValueDispatch();
  return (keys: Set<string>) =>
    dispatch({
      type: TOGGLE_ENABLED,
      squareKeys: keys,
    });
};

export const useToggleValue = () => {
  const dispatch = useValueDispatch();
  return (keys: Set<string>, value: Digit) =>
    dispatch({
      type: TOGGLE_VALUE,
      squareKeys: keys,
      value,
    });
};

export const useSetWhole = () => {
  const dispatch = useValueDispatch();
  return (value: ValueMap) =>
    dispatch({
      type: SET_WHOLE,
      value,
    });
};

const cache: { [key: string]: string[] } = {};

function getClueStartingPositions(gridSize: number, map: ValueMap) {
  const hashed = hash({ gridSize, map });
  if (cache[hashed]) return cache[hashed];
  const clueStarts = [];

  // Function to check if a position is a valid clue starting point
  const isClueStart = (row: number, col: number) => {
    if (map[getKey({ x: row, y: col })] === "DISABLED") return false;

    const isStartOfAcross =
      col === 0 || map[getKey({ x: row, y: col - 1 })] === "DISABLED";
    const isStartOfDown =
      row === 0 || map[getKey({ x: row - 1, y: col })] === "DISABLED";

    return isStartOfAcross || isStartOfDown;
  };

  for (let col = 0; col < gridSize; col++) {
    for (let row = 0; row < gridSize; row++) {
      if (isClueStart(row, col)) {
        clueStarts.push(getKey({ x: row, y: col }));
      }
    }
  }
  cache[hashed] = clueStarts;
  return clueStarts;
}

function parse(local: string) {
  const o: any = {};
  for (const [key, value] of Object.entries(JSON.parse(local))) {
    o[key] = Array.isArray(value) ? new Set([...value]) : value;
  }
  return o as ValueMap;
}
