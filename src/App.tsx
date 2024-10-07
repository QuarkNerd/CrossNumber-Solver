import "./App.scss";
import Grid from "./components/Grid/Grid";
// import { size } from './constants';

// move to slice? or ContextWrapperComponent

export default function App() {
  // const [selected, setSelected] = useReducer(Array(size**size).fill(false).map(() => Array(size).fill(false)));
  // const [tasks, dispatch] = useReducer(tasksReducer, Array(size**size).fill(false).map(() => Array(size).fill(false)));

  return (
    <>
      <Grid />
    </>
  );
}
