import { useCallback, useState } from "react";
import { useSelectedSelector } from "../../contexts/SelectedContext";
import ValidatorView from "../ValidatorView/ValidatorView";
import styles from "./Solver.module.scss";
import { useValuesGetCurrentValue } from "../../contexts/ValuesContext";
import { solve, Validator } from "../../solver";
import { getFunctionString } from "../../utils";

export default function Solver() {
  const sel = useSelectedSelector((cellls) => [...cellls].sort());
  const getValues = useValuesGetCurrentValue();
  const [newFunction, setNewFunction] = useState("");
  const [validitors, setValidators] = useState<Validator[]>([]);

  const solveCallback = useCallback(() => {
    console.log(solve(getValues(), validitors));
  }, [validitors]);
  return (
    <div className={styles.solver}>
      {sel.join(" ")} <br />
      <textarea
        onKeyDown={(e) => e.stopPropagation()}
        onChange={(e) => setNewFunction(e.target.value)}
        value={newFunction}
      ></textarea>
      <div className={styles.buttons}>
        <button
          onClick={() => {
            const f = getFunctionString({
              inputs: sel,
              predicateView: newFunction,
            });
            setValidators([
              { inputs: sel, predicate: eval(f), predicateView: newFunction },
              ...validitors,
            ]);
            setNewFunction("");
          }}
        >
          Add
        </button>
        <button onClick={solveCallback}>Execute</button>
      </div>
      <div className={styles.validators}>
        {validitors.map((v, i) => (
          <ValidatorView
            validator={v}
            key={i}
            selected={sel.join("") === v.inputs.join("")}
            onDelete={() => setValidators(validitors.filter((x) => x != v))}
          />
        ))}
      </div>
    </div>
  );
}

//// Add section
//// celss from left
/// drag
