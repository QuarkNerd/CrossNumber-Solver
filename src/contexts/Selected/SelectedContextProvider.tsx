import { createContext, Dispatch, PropsWithChildren, useContext } from "react";
import { useImmerReducer } from "use-immer";

const size = 12;
const initialSelected = Array(size)
  .fill(undefined)
  .map(() => Array(size).fill(false));

const SelectedContext = createContext<SelectedMap>(initialSelected);
const SelectedDispatchContext = createContext<Dispatch<SelectedAction>>(
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

export const toggleSelcted = (x: number, y: number): SelectedAction => ({
  type: "TOGGLE",
  x,
  y,
});

export const useSelected = () => useContext(SelectedContext);
export const useSelectedDispatch = () => useContext(SelectedDispatchContext);

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
