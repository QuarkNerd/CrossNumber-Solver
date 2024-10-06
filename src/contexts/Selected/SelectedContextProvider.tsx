import { createContext, Dispatch, PropsWithChildren } from "react";
import { useImmerReducer } from "use-immer";

const size = 12;
const initialSelected = Array(size)
  .fill(undefined)
  .map(() => Array(size).fill(false));

export const SelectedContext = createContext(initialSelected);
export const SelectedDispatchContext = createContext<Dispatch<SelectedAction>>(
  null as unknown as Dispatch<SelectedAction>
);

type SelectedMap = boolean[][];
type SelectedAction = {
  type: "TOGGLE";
  x: number;
  y: number;
};

const selectedReducer = (initial: SelectedMap, action: SelectedAction) => {
  switch (action.type) {
    case "TOGGLE":
      initial[action.y][action.x] = !initial[action.y][action.x];
      break;
  }
};

export default function SelectedContextProvider({
  children,
}: PropsWithChildren) {
  const [selected, dispatch] = useImmerReducer<SelectedMap, SelectedAction>(
    selectedReducer,
    initialSelected
  );
  return (
    <SelectedContext.Provider value={selected}>
      <SelectedDispatchContext.Provider value={dispatch}>
        {children}
      </SelectedDispatchContext.Provider>
    </SelectedContext.Provider>
  );
}
