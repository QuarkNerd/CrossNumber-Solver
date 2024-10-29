import {
  useSetWhole,
  useValuesGetCurrentValue,
  ValueMap,
} from "../../contexts/ValuesContext";
import styles from "./ValueStorageManager.module.scss";

function toString(v: ValueMap) {
  const ch: any = {};
  for (const [key, value] of Object.entries(v)) {
    ch[key] = value instanceof Set ? [...value] : value;
  }
  return JSON.stringify(ch);
}

function fromString(st: string) {
  const ch = JSON.parse(st);
  for (const [key, value] of Object.entries(ch)) {
    ch[key] = Array.isArray(value) ? new Set(value) : value;
  }
  return ch as ValueMap;
}

export default function ValidatorView() {
  const st = useValuesGetCurrentValue();
  const setWhole = useSetWhole();
  return (
    <div className={styles.main}>
      <button onClick={() => localStorage.setItem("values", toString(st()))}>
        Save
      </button>
      <button
        onClick={() => setWhole(fromString(localStorage.getItem("values")!))}
      >
        Load
      </button>
    </div>
  );
}
