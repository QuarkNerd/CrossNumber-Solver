import styles from "./Grid.module.scss";
import Square from "../Square/Square";

export default function Grid() {
  const indexes = [...Array(12).keys()];
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
