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
