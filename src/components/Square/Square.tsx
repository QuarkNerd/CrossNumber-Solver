import styles from "./Square.module.scss";
import { toggleSelcted } from "../../contexts/Selected/SelectedContextProvider";
import { Dispatch, useCallback } from "react";
import React from "react";

interface Props {
  x: number;
  y: number;
  isSelected: boolean;
  dispatch: Dispatch<any>;
  // dis
}

export default React.memo(function Square({
  x,
  y,
  isSelected,
  dispatch,
}: Props) {
  return (
    <div
      className={styles.square + " " + (isSelected ? styles.selected : "")}
      onClick={() => dispatch(toggleSelcted(x, y))}
    ></div>
  );
});
