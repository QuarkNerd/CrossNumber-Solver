import createContextSlice from "./CreateContextSlice";
const initialSelected: Set<string> = new Set();

const TOGGLE = "TOGGLE";
const RESET = "RESET";

type Action =
  | {
      type: "TOGGLE";
      payload: string[];
    }
  | { type: "RESET" };

const selectedReducer = (initial: Set<string>, action: Action) => {
  if (action.type === RESET) {
    initial.clear();
    return;
  }
  action.payload.forEach((st) => {
    if (initial.has(st)) {
      initial.delete(st);
    } else {
      initial.add(st);
    }
  });
};

const slice = createContextSlice("selected", initialSelected, selectedReducer);

export const {
  useSelectedSelector,
  useSelectedDispatch,
  SelectedContextProvider,
  useSelectedGetCurrentValue,
} = slice;

export const useToggleSelected = (keys: string[] | string) => {
  const keysArray = Array.isArray(keys) ? keys : [keys];
  const dispatch = useSelectedDispatch();
  return () => dispatch({ type: TOGGLE, payload: keysArray });
};

export const useResetSelected = () => {
  const dispatch = useSelectedDispatch();
  return () => dispatch({ type: RESET });
};
