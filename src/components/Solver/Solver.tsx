import { useState } from "react";
import { useSelectedSelector } from "../../contexts/SelectedContext";
import ValidatorView from "../ValidatorView/ValidatorView";
import styles from "./Solver.module.scss";

export interface Validator {
  inputs: string[];
  validatePredicate: string;
}

export default function Solver() {
  const sel = useSelectedSelector((cellls) => [...cellls].sort());
  const [newFunction, setNewFunction] = useState("");
  const [validitors, setValidators] = useState<Validator[]>([]);
  return (
    <div className={styles.solver}>
      {sel.join(" ")} <br />
      <textarea
        onKeyDown={(e) => e.stopPropagation()}
        onChange={(e) => setNewFunction(e.target.value)}
        value={newFunction}
      ></textarea>
      <button
        onClick={() => {
          setValidators([
            { inputs: sel, validatePredicate: newFunction },
            ...validitors,
          ]);
          setNewFunction("");
        }}
      >
        Add
      </button>
      <button onClick={solve}>Execute</button>
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
