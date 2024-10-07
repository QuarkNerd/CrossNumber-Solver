import styles from "./Square.module.scss";
import { toggleSelcted } from "../../contexts/Selected/SelectedContextProvider";
import { Dispatch } from "react";
import React from "react";

interface Props {
  x: number;
  y: number;
  isSelected: boolean;
  clueIndex: number;
  dispatch: Dispatch<any>;
}

export default React.memo(function Square({
  x,
  y,
  isSelected,
  dispatch,
  clueIndex,
}: Props) {
  return (
    <div
      className={styles.square + " " + (isSelected ? styles.selected : "")}
      onClick={() => dispatch(toggleSelcted(x, y))}
    >
      <span className={styles.clueIndex}>{clueIndex}</span>
    </div>
  );
});

// TODO adapt SelectedContext to provide active and maybe direct information
// use html button to disable buttons or maybe floating x that only appears when hover? the 2nd one
// if context is seperated it will reduce recalculations? experiment
// zoom and css fix
