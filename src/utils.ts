import { Coor } from "./types";

export function getKey(coor: Coor) {
  return getLetter(coor.y) + "_" + coor.x;
}

export function getLetter(y: number) {
  return String.fromCharCode(65 + y);
}
