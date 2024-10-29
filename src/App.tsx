import Grid from "./components/Grid/Grid";
import Solver from "./components/Solver/Solver";
import ValueStorageManager from "./components/ValueStorageManager/ValueStorageManager";
import styles from "./App.module.scss";

export default function App() {
  return (
    <>
      <div className={styles.main}>
        <Grid />
        <div className={styles.instructions}>
          <ul>
            <li>Click on cells to select them </li>
            <li>
              Type digits to toggle them in selected cells. You can add multiple
              values
            </li>
            <li>Press X to disable selected cells</li>
            <li>Press Y to deselect all cells</li>
          </ul>
          Then to find solutions via constraints
          <ul>
            <li>Select cells for first constraint </li>
            <li>Type constraints in textbox, e.g. A10 + A11 === 9</li>
            <li>Click Add</li>
            <li>Repeat for all constraints (too many will slow it down)</li>
            <li>Click execute</li>
            <li>
              You can delete constraints by clicking the button that appears
              when you hover over them
            </li>
          </ul>
        </div>
        <Solver />
      </div>
      <ValueStorageManager />
    </>
  );
}
