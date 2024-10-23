import { Validator } from "./components/Solver/Solver";
import { Coor } from "./types";

export function getKey(coor: Coor) {
  return getLetter(coor.y) + coor.x;
}

export function getLetter(y: number) {
  return String.fromCharCode(65 + y);
}

export function getFunctionString(validator: Validator) {
  return `(${validator.inputs.join(", ")}) => ${validator.validatePredicate}`;
}
