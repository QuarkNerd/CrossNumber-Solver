import "./App.scss";
import Grid from "./components/Grid/Grid";
import Solver from "./components/Solver/Solver";

export default function App() {
  return (
    <>
      <Grid />
      <Solver />
      {/* <input
        value={value}
        onChange={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setValue("www");
        }}
        type={"text"}
      /> */}
    </>
  );
}
