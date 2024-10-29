import styles from "./Grid.module.scss";
import Square from "../Square/Square";
import { useEffect } from "react";
import {
  useResetSelected,
  useSelectedGetCurrentValue,
} from "../../contexts/SelectedContext";
import {
  Digit,
  useToggleEnable,
  useToggleValue,
} from "../../contexts/ValuesContext";
import { getLetter } from "../../utils";

export default function Grid() {
  const indexes = [...Array(12).keys()];
  const getSelected = useSelectedGetCurrentValue();
  const toggleValue = useToggleValue();
  const toggleEnable = useToggleEnable();
  const resetSelected = useResetSelected();
  useEffect(() => {
    const callback = (event: KeyboardEvent) => {
      const val = getSelected();
      if (event.key === "x") {
        toggleEnable(val);
        return;
      }
      if (event.key === "y") {
        resetSelected();
        return;
      }
      const int = parseInt(event.key);
      if (!isNaN(int)) {
        toggleValue(val, int as Digit);
      }
    };
    addEventListener("keydown", callback);
    return () => removeEventListener("keydown", callback);
  }, []);
  return (
    <div className={styles.grid}>
      <div key={-1} className={styles.row}>
        <div className={styles.corner}></div>
        {indexes.map((x) => (
          <div className={styles.columnKey} key={x}>
            {x}
          </div>
        ))}
      </div>
      {indexes.map((y) => (
        <div key={y} className={styles.row}>
          <div className={styles.rowKey} key={-1}>
            {getLetter(y)}
          </div>
          {indexes.map((x) => (
            <Square key={x} x={x} y={y}></Square>
          ))}
        </div>
      ))}
    </div>
  );
}
