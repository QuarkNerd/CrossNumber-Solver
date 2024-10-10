import { getKey } from "../utils";
import createContextSlice from "./CreateContextSlice";

const TOGGLE_VALUE = "TOGGLE_VALUE";
const TOGGLE_ENABLED = "TOGGLE_ENABLED";
const DISABLED = "DISABLED";

type Digit = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

type ValueMap = { [key: string]: Set<Digit> | typeof DISABLED | undefined };
type ValuesAction =
  | {
      type: "TOGGLE_VALUE";
      value: Digit;
      squareKey: string;
    }
  | {
      type: "TOGGLE_ENABLED";
      squareKey: string;
    };

const selectedReducer = (initial: ValueMap, action: ValuesAction) => {
  switch (action.type) {
    case TOGGLE_ENABLED:
      if (initial[action.squareKey] === DISABLED) {
        delete initial[action.squareKey];
        return;
      }
      initial[action.squareKey] = DISABLED;
      break;
    case TOGGLE_VALUE:
      if (initial[action.squareKey] === DISABLED) {
        return;
      }
      if (initial[action.squareKey] === undefined) {
        initial[action.squareKey] = new Set([action.value]);
        return;
      }
      const set = initial[action.squareKey] as Set<Digit>;
      if (set.has(action.value)) {
        set.delete(action.value);
      } else {
        set.add(action.value);
      }
  }
};

export const toggleEnabled = (key: string): ValuesAction => ({
  type: TOGGLE_ENABLED,
  squareKey: key,
});

export const toggleValue = (key: string, value: Digit): ValuesAction => ({
  type: TOGGLE_VALUE,
  squareKey: key,
  value,
});

const slice = createContextSlice("value", {}, selectedReducer);

export const { useValue, useValueDispatch, ValueContextProvider } = slice;
