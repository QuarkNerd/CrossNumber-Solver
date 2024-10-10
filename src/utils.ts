import { Coor } from "./types";

export function getKey(coor: Coor) {
  return String.fromCharCode(65 + coor.y) + "_" + coor.x;
}
