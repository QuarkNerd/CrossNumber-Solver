import { PartialValidator } from "./solver";
import { Coor } from "./types";

export function getKey(coor: Coor) {
  return getLetter(coor.y) + coor.x;
}

export function getLetter(y: number) {
  return String.fromCharCode(65 + y);
}

const spaceNewLine = "\n     ";

export function getFunctionString(validator: PartialValidator) {
  return `(${validator.inputs.join(
    ", "
  )}) =>${spaceNewLine}${validator.predicateView.replaceAll(
    "\n",
    spaceNewLine
  )}`;
}
