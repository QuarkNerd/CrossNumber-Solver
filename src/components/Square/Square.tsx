import styles from "./Square.module.scss";
import {
  useToggleSelected,
  useSelectedSelector,
} from "../../contexts/SelectedContext";
import React from "react";
import { getKey } from "../../utils";
import { useClueNumber, useValueSelector } from "../../contexts/ValuesContext";
import classNames from "classnames";

interface Props {
  x: number;
  y: number;
}

export default React.memo(function Square({ x, y }: Props) {
  const key = getKey({ x, y });
  const isSelected = useSelectedSelector((sel) => sel.has(key));
  const value = useValueSelector((sel) => sel[key]);
  const toggle = useToggleSelected(key);
  const singleValue = value instanceof Set && value.size === 1;
  const clueNumber = useClueNumber(key);
  return (
    <div
      className={classNames(styles.square, {
        [styles.selected]: isSelected,
        [styles.disabled]: value === "DISABLED",
      })}
      onClick={toggle}
    >
      <p className={styles.clueIndex}>
        {clueNumber === -1 ? "" : clueNumber + 1}
      </p>
      <div
        className={classNames(styles.values, {
          [styles.singleValue]: singleValue,
        })}
      >
        {value instanceof Set ? [...value].sort() : ""}
      </div>
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
