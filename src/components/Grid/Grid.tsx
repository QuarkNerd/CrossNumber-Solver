import styles from "./Grid.module.scss";
import Square from "../Square/Square";
import { useSelected } from "../../contexts/Selected/SelectedContextProvider";

export default function Grid() {
  const selected = useSelected();
  // TODO: Just use appropriate sized array here rather than entire selctedContext once a size management system exists
  return (
    <div className={styles.grid}>
      {selected.map((row, y) => (
        <div className={styles.row}>
          {row.map((_, x) => (
            <Square key={y + "_" + x} x={x} y={y}></Square>
          ))}
        </div>
      ))}
    </div>
  );
}
