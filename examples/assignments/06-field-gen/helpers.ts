export type InfoCell = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
export type Cell = 0 | InfoCell | 9 | 10 | 11 | 12;

export type Field = Cell[][];
export type Coords = [number, number];

export const CellState: Record<string, Cell> = {
  empty: 0,
  bomb: 9,
  hidden: 10,
  flag: 11,
  weakFlag: 12,
};

/**
 * Create empty field
 *
 * Example emptyFieldGenerator(2)
 * [
 *   [0, 0],
 *   [0, 0],
 * ]
 *
 * @param {number} size
 * @param {Cell} state
 * @returns {Field}
 */
export const generateFieldWithDefaultState = (
  size: number,
  state: Cell = CellState.empty,
): Field => new Array(size).fill(null).map(() => new Array(size).fill(state));

/**
 * Get neighbour cells indexes
 * @param {Coords} coords
 * @returns {Record<string, [number, number]>}
 */
export const getPossibleNeigboursItems = ([y, x]: Coords): Record<
  string,
  [number, number]
> => ({
  top: [y - 1, x],
  topRight: [y - 1, x + 1],
  right: [y, x + 1],
  rightBottom: [y + 1, x + 1],
  bottom: [y + 1, x],
  bottomLeft: [y + 1, x - 1],
  left: [y, x - 1],
  leftTop: [y - 1, x - 1],
});

/**
 * Check item in the field
 * @param {Coords} coords
 * @param {Field} field
 * @returns {boolean}
 */
export const checkItemInField = ([y, x]: Coords, field: Field): boolean => {
  const maxY = field.length;
  const maxX = field[y]?.length ?? 0;
  return y >= 0 && x >= 0 && maxY - y > 0 && maxX - x > 0;
};

/**
 * Get neigbours items coords
 * @param {Coords} coords
 * @param {Field} field
 * @returns {Coords[]}
 */
export const getNeigboursCoords = (coords: Coords, field: Field): Coords[] =>
  Object.values(getPossibleNeigboursItems(coords)).filter(([y, x]) =>
    checkItemInField([y, x], field),
  );

/**
 * Get neigbours items coords
 * @param {Coords} coords
 * @param {Field} field
 * @returns {Coords[]}
 */
export const getNeigboursWithInfoCoords = (
  coords: Coords,
  field: Field,
): Coords[] => {
  const { empty: e, bomb: b } = CellState;
  return getNeigboursCoords(coords, field).filter(([y, x]) => {
    const neigbourCell = field[y][x];
    return e < neigbourCell && neigbourCell < b;
  });
};

/**
 * Get neigbours items coords
 * @param {Coords} coords
 * @param {Field} field
 * @returns {Coords[]}
 */
export const getHiddenNeigbours = (coords: Coords, field: Field): Coords[] => {
  const { hidden: h } = CellState;
  return getNeigboursCoords(coords, field).filter(([y, x]) => {
    const neigbourCell = field[y][x];
    return neigbourCell === h;
  });
};

/**
 * Increment neighbour items for cell with coords
 * @param {Coords} coords
 * @param {Field} field
 * @returns {Cell}
 */
export const incrementNeibours = (coords: Coords, field: Field): Field => {
  for (const [y, x] of getNeigboursCoords(coords, field)) {
    const cell = field[y][x];
    if (cell < 8) {
      field[y][x] = (cell + 1) as Cell;
    }
  }

  return field;
};
