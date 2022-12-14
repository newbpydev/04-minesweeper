import { emptyFieldGenerator } from "./../../../src/helpers/Field";
import {
  Field,
  CellState,
  incrementNeibours,
  generateFieldWithDefaultState,
} from "./helpers";

/**
 * Generate field with mines
 * Cell has a range between 0 and 9 where
 * 0 - have no any mine
 * from 0 to 8 - count of mines arrount the cell
 * 9 - special flag for the mine
 *
 * (1/9 ~ 11.11%)
 * Example fieldGenerator(3, 1/9) would return
 * [
 *   [1, 1, 1],
 *   [1, 9, 1],
 *   [1, 1, 1]
 * ]
 *
 * @param {number} size
 * @param {number} probability
 * @returns {Field}
 */
export const fieldGenerator = (size: number, probability: number): Field => {
  if (probability < 0 || probability > 1) {
    throw new Error("Probability must be between 0 and 1");
  }
  // here is your code
  let unprocessedCells = size * size;
  let restCellsWithBombs = unprocessedCells * probability;
  const result: Field = generateFieldWithDefaultState(size);

  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      if (restCellsWithBombs === 0) return result;

      if (restCellsWithBombs / unprocessedCells > Math.random()) {
        result[y][x] = CellState.bomb;
        incrementNeibours([y, x], result);
        restCellsWithBombs--;
      }
      unprocessedCells--;
    }
  }

  return result;
  // return [[]];
};
