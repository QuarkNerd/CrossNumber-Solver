import { ValueMap } from "./contexts/ValuesContext";

export interface PartialValidator {
  inputs: string[];
  predicateView: string;
}

export interface Validator extends PartialValidator {
  predicate: (...args: number[]) => boolean;
}

export function solve(values: ValueMap, testList: Validator[]) {
  const tests = [...testList];
  if (!tests.length) return;
  const parsedValues = parse(values);
  const test = tests.sort((a, b) => a.inputs.length - b.inputs.length)[0]!;
  console.log(test);
  const key = test.inputs[0];

  let solutions = parsedValues[key].map((v) => ({ [key]: v }));
  while (tests.length) {
    const currentKeys = Object.keys(solutions[0]);

    tests.sort(
      (a, b) =>
        getMissingKeys(b, currentKeys).length -
        getMissingKeys(a, currentKeys).length
    );

    const test = tests.pop()!;
    const miss = getMissingKeys(test, currentKeys);

    solutions = solutions.flatMap((sol) =>
      expandByTest(test, miss, sol, parsedValues)
    );
  }

  return solutions;
}

function getMissingKeys(test: Validator, keys: string[]): string[] {
  return test.inputs.filter((sl) => !keys.includes(sl));
}

function parse(vMap: ValueMap) {
  const parsed: { [key: string]: number[] } = {};
  for (const [key, value] of Object.entries(vMap)) {
    if (value instanceof Set) {
      parsed[key] = [...value];
    }
  }
  return parsed;
}

function expandByTest(
  test: Validator,
  missingKeyList: string[],
  sol: { [key: string]: number },
  possibleValues: { [key: string]: number[] }
): { [key: string]: number }[] {
  console.log(missingKeyList);
  let potentialSolutions = [sol];
  for (const missingKey of missingKeyList) {
    potentialSolutions = potentialSolutions.flatMap((s) =>
      possibleValues[missingKey].map((newValue) => ({
        ...s,
        [missingKey]: newValue,
      }))
    );
  }
  return potentialSolutions.filter((s) =>
    test.predicate(...test.inputs.map((sl) => s[sl]))
  );
}
