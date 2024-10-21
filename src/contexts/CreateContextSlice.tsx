// Creates a slice in context based on state and reducer, similar to redux toolkit but a lot more basic, mainly done to teach myself complex TS, theres many better ways to make this whole thing and app in general

import {
  Dispatch,
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useRef,
  useLayoutEffect,
} from "react";
import { ImmerReducer, useImmerReducer } from "use-immer";

type ContextSlice<Name extends string, State, Action> = {
  [key in `use${Capitalize<Name & string>}Selector`]: <T>(
    fn: (st: State) => T
  ) => T;
} & {
  [key in `use${Capitalize<Name & string>}Dispatch`]: () => Dispatch<Action>;
} & {
  [key in `use${Capitalize<Name & string>}GetCurrentValue`]: () => () => State;
} & {
  [key in `${Capitalize<Name & string>}ContextProvider`]: (
    props: PropsWithChildren
  ) => JSX.Element;
};

const capitalise = (inp: string) => inp.charAt(0).toUpperCase() + inp.slice(1);

type Subscriber = () => void;
type Store<S, A> = {
  dispatch: Dispatch<A>;
  subscribe: (fn: Subscriber) => Function;
  getValue: () => S;
};

export default function createContextSlice<Name extends string, State, Action>(
  name: Name,
  initial: State,
  reducer: ImmerReducer<State, Action>
): ContextSlice<Name, State, Action> {
  const Context = createContext(null as any as Store<State, Action>);

  function ContextProvider({ children }: PropsWithChildren) {
    const [value, dispatch] = useImmerReducer(reducer, initial);

    const valueRef = useRef(value);
    valueRef.current = value;

    const subscribers = useRef([] as Subscriber[]);
    const store: Store<State, Action> = useMemo(
      () => ({
        dispatch,
        subscribe: (sb) => {
          subscribers.current.push(sb);
          return () => {
            subscribers.current = subscribers.current.filter((cc) => cc !== sb);
          };
        },
        getValue: () => valueRef.current,
      }),
      []
    );

    useLayoutEffect(() => {
      subscribers.current.forEach((sb) => sb());
    }, [value]);

    return <Context.Provider value={store}>{children}</Context.Provider>;
  }

  function useSelector<T>(fn: (st: State) => T) {
    const [, causeRerender] = useReducer((a) => a + 1, 1);
    const store = useContext(Context);

    const selectedRef = useRef(fn(store.getValue()));
    selectedRef.current = fn(store.getValue());

    useEffect(() => {
      const subscription = store.subscribe(() => {
        if (selectedRef.current !== fn(store.getValue())) {
          causeRerender();
        }
      });
      return () => subscription();
    }, []);
    return selectedRef.current;
  }

  function useGetCurrentValue() {
    const store = useContext(Context);
    return store.getValue;
  }

  const cName = capitalise(name);

  return {
    [`use${cName}Selector`]: useSelector,
    [`use${cName}GetCurrentValue`]: useGetCurrentValue,
    [`use${cName}Dispatch`]: () => {
      const { dispatch } = useContext(Context);
      return dispatch;
    },
    [`${cName}ContextProvider`]: ContextProvider,
  } as ContextSlice<Name, State, Action>;
}
