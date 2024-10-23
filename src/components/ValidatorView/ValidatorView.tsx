import classNames from "classnames";
import { getFunctionString } from "../../utils";
import { Validator } from "../Solver/Solver";
import styles from "./ValidatorView.module.scss";

interface Props {
  validator: Validator;
  onDelete: () => void;
  selected: boolean;
}

export default function ValidatorView({
  validator,
  onDelete,
  selected,
}: Props) {
  return (
    <div className={classNames(styles.view, { [styles.selected]: selected })}>
      <div>{getFunctionString(validator)}</div>
      <button onClick={onDelete}>Delete</button>
    </div>
  );
}
