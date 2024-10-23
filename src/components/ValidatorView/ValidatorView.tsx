import { getFunctionString } from "../../utils";
import { Validator } from "../Solver/Solver";
import styles from "./ValidatorView.module.scss";

interface Props {
  validator: Validator;
  onDelete: () => void;
}

export default function ValidatorView({ validator, onDelete }: Props) {
  return (
    <div className={styles.view}>
      <div>{getFunctionString(validator)}</div>
      <button onClick={onDelete}>Delete</button>
    </div>
  );
}
