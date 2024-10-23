import createContextSlice from "./CreateContextSlice";
const initialSelected: Set<string> = new Set();

const selectedReducer = (initial: Set<string>, action: string[]) => {
  action.forEach((st) => {
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
  return () => dispatch(keysArray);
};
