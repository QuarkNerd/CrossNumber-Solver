import classNames from "classnames";
import { getFunctionString } from "../../utils";
import styles from "./ValidatorView.module.scss";
import { Validator } from "../../solver";

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
      <button className={styles.delete} onClick={onDelete}>
        Delete
      </button>
    </div>
  );
}
