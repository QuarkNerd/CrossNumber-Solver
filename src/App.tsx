import "./App.scss";
import Grid from "./components/Grid/Grid";
import Solver from "./components/Solver/Solver";
import ValueStorageManager from "./components/ValueStorageManager/ValueStorageManager";

export default function App() {
  return (
    <>
      <div className="main">
        <Grid />
        <Solver />
      </div>
      <ValueStorageManager />
    </>
  );
}
