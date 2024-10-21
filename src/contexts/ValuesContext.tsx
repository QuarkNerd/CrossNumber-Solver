import createContextSlice from "./CreateContextSlice";

const TOGGLE_VALUE = "TOGGLE_VALUE";
const TOGGLE_ENABLED = "TOGGLE_ENABLED";
const DISABLED = "DISABLED";

export type Digit = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

type ValueMap = { [key: string]: Set<Digit> | typeof DISABLED | undefined };
type ValuesAction =
  | {
      type: "TOGGLE_VALUE";
      value: Digit;
      squareKeys: Set<string>;
    }
  | {
      type: "TOGGLE_ENABLED";
      squareKeys: Set<string>;
    };

const valuesReducer = (initial: ValueMap, action: ValuesAction) => {
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

const slice = createContextSlice("value", {} as ValueMap, valuesReducer);

export const { useValueSelector, ValueContextProvider } = slice;
const useValueDispatch = slice.useValueDispatch;

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

slice.useValueDispatch;
