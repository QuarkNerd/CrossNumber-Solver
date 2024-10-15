import styles from "./Grid.module.scss";
import Square from "../Square/Square";
import {
  useSelectedDispatch,
  useSelectedSelector,
} from "../../contexts/SelectedContext";

export default function Grid() {
  const selected = useSelectedSelector((a) => a);
  const dispatch = useSelectedDispatch();
  // TODO: Just use appropriate sized array here rather than entire selctedContext once a size management system exists
  return (
    <div className={styles.grid}>
      {selected.map((row, y) => (
        <div key={y} className={styles.row}>
          {row.map((sel, x) => (
            <Square
              isSelected={sel}
              key={x}
              x={x}
              y={y}
              dispatch={dispatch}
              clueIndex={3}
            ></Square>
          ))}
        </div>
      ))}
    </div>
  );
}
