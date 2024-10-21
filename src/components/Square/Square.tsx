import styles from "./Square.module.scss";
import {
  useToggleSelected,
  useSelectedSelector,
} from "../../contexts/SelectedContext";
import React from "react";
import { getKey } from "../../utils";

interface Props {
  x: number;
  y: number;
}

export default React.memo(function Square({ x, y }: Props) {
  const key = getKey({ x, y });
  const isSelected = useSelectedSelector((sel) => sel.has(key));
  const toggle = useToggleSelected(key);
  return (
    <div
      className={styles.square + " " + (isSelected ? styles.selected : "")}
      onClick={toggle}
    >
      <p className={styles.clueIndex}>{2}</p>
    </div>
  );
});

// TODO adapt SelectedContext to provide active and maybe direct information
// use html button to disable buttons or maybe floating x that only appears when hover? the 2nd one
// if context is seperated it will reduce recalculations? experiment
// zoom and css fix

// ValuesContext
//CalculationsCOntext -- only needed for saving
// if massive setter is used for saving. then maybe dont need size context, just keep Selected as i
