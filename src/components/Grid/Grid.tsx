import styles from "./Grid.module.scss";
import Square from "../Square/Square";
import { useEffect } from "react";
import { useSelectedGetCurrentValue } from "../../contexts/SelectedContext";
import {
  Digit,
  useToggleEnable,
  useToggleValue,
} from "../../contexts/ValuesContext";

export default function Grid() {
  const indexes = [...Array(12).keys()];
  const getSelected = useSelectedGetCurrentValue();
  const toggleValue = useToggleValue();
  const toggleEnable = useToggleEnable();
  useEffect(() => {
    const callback = (event: KeyboardEvent) => {
      const val = getSelected();
      if (event.key === "x") {
        toggleEnable(val);
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
      {indexes.map((y) => (
        <div key={y} className={styles.row}>
          {indexes.map((x) => (
            <Square key={x} x={x} y={y}></Square>
          ))}
        </div>
      ))}
    </div>
  );
}
