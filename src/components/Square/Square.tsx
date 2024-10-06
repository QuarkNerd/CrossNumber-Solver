import styles from "./Square.module.scss";
import {
  toggleSelcted,
  useSelected,
  useSelectedDispatch,
} from "../../contexts/Selected/SelectedContextProvider";
import { useCallback } from "react";

interface Props {
  x: number;
  y: number;
}

export default function Square({ x, y }: Props) {
  const dispatch = useSelectedDispatch();
  const selected = useSelected();
  const click = useCallback(
    () => dispatch(toggleSelcted(x, y)),
    [x, y, dispatch]
  );
  return (
    <div
      className={styles.square + " " + (selected[y][x] ? styles.selected : "")}
      onClick={click}
    ></div>
  );
}
