// Creates a slice in context based on state and reducer, similar to redux toolkit but a lot more basic, mainly done to teach myself complex TS

import { Dispatch, createContext, PropsWithChildren, useContext } from "react";
import { ImmerReducer, useImmerReducer } from "use-immer";

type ContextSlice<Name extends string, State, Action> = {
  [key in `use${Capitalize<Name & string>}`]: () => State;
} & {
  [key in `use${Capitalize<Name & string>}Dispatch`]: () => Dispatch<Action>;
} & {
  [key in `${Capitalize<Name & string>}ContextProvider`]: (
    props: PropsWithChildren
  ) => JSX.Element;
};

const capitalise = (inp: string) => inp.charAt(0).toUpperCase() + inp.slice(1);

export default function createContextSlice<Name extends string, State, Action>(
  name: Name,
  initial: State,
  reducer: ImmerReducer<State, Action>
): ContextSlice<Name, State, Action> {
  const ValueContext = createContext(initial);
  const DispatchContext = createContext(null as unknown as Dispatch<Action>);

  const cName = capitalise(name);

  function ContextProvider({ children }: PropsWithChildren) {
    const [selected, dispatch] = useImmerReducer(reducer, initial);
    return (
      <ValueContext.Provider value={selected}>
        <DispatchContext.Provider value={dispatch}>
          {children}
        </DispatchContext.Provider>
      </ValueContext.Provider>
    );
  }

  return {
    [`use${cName}`]: () => useContext(ValueContext),
    [`use${cName}Dispatch`]: () => useContext(DispatchContext),
    [`${cName}ContextProvider`]: ContextProvider,
  } as ContextSlice<Name, State, Action>;
}
