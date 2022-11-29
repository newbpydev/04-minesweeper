import { emptyFieldGenerator, fieldGenerator, CellState, Cell } from "./Field";

const { empty, bomb, hidden } = CellState;

const cellWithBombFilter = (cell: Cell) => cell === bomb;

describe("Field Generator", () => {
  describe("emptyFieldGenerator tests", () => {
    it("2x2", () => {
      expect(emptyFieldGenerator(2)).toStrictEqual([
        [empty, empty],
        [empty, empty],
      ]);
    });
    it("3x3", () => {
      expect(emptyFieldGenerator(3)).toStrictEqual([
        [empty, empty, empty],
        [empty, empty, empty],
        [empty, empty, empty],
      ]);
    });
    it("3x3 with hidden state", () => {
      expect(emptyFieldGenerator(3, hidden)).toStrictEqual([
        [hidden, hidden, hidden],
        [hidden, hidden, hidden],
        [hidden, hidden, hidden],
      ]);
    });
  });

  describe("Simple cases", () => {
    // @ wrong probability test
    it("Wrong probability", () => {
      const errorText = "Probability must be between 0 and 1";
      expect(() => fieldGenerator(1, -1)).toThrow(errorText);
      expect(() => fieldGenerator(1, 2)).toThrow(errorText);
    });
    // @ smallest possible field without mine
    it("Smallest possible field without mines", () => {
      expect(fieldGenerator(1, 0)).toStrictEqual([[empty]]);
    });
    // @ big possible field without mine
    it("Big field without mines", () => {
      expect(fieldGenerator(10, 0)).toStrictEqual([
        [empty, empty, empty, empty, empty, empty, empty, empty, empty, empty],
        [empty, empty, empty, empty, empty, empty, empty, empty, empty, empty],
        [empty, empty, empty, empty, empty, empty, empty, empty, empty, empty],
        [empty, empty, empty, empty, empty, empty, empty, empty, empty, empty],
        [empty, empty, empty, empty, empty, empty, empty, empty, empty, empty],
        [empty, empty, empty, empty, empty, empty, empty, empty, empty, empty],
        [empty, empty, empty, empty, empty, empty, empty, empty, empty, empty],
        [empty, empty, empty, empty, empty, empty, empty, empty, empty, empty],
        [empty, empty, empty, empty, empty, empty, empty, empty, empty, empty],
        [empty, empty, empty, empty, empty, empty, empty, empty, empty, empty],
      ]);
    });

    // @ smallest possible field with mine
    it("Smallest possible field with mines", () => {
      expect(fieldGenerator(1, 1)).toStrictEqual([[bomb]]);
    });
    // @ 2x2 field with mine
    it("2x2 field with mines", () => {
      expect(fieldGenerator(2, 1)).toStrictEqual([
        [bomb, bomb],
        [bomb, bomb],
      ]);
    });
    // @ 2x2 field with 50% probability
    it("2x2 field with 50% probability", () => {
      const field = fieldGenerator(2, 0.5); //?
      const flatField = field.flat(); //?

      // console.table(field);
      // console.table(flatField);

      const cellsWithBombs = flatField.filter((cell) => cell === bomb); //?
      const emptyCells = flatField.filter((cell) => cell === 2); //?
      // const emptyCells = flatField.filter((cell) => cell === empty); //?

      expect(cellsWithBombs).toHaveLength(2);
      expect(emptyCells).toHaveLength(2);

      // expect(fieldGenerator(2, 1)).toStrictEqual([
      //   [bomb, bomb],
      //   [bomb, bomb],
      // ]);
    });

    it("Real game field size = 10x10 with 1/4 mixed cells (~25 mines)", () => {
      const size = 10;
      const mines = 25;

      const probability = mines / (size * size);
      const field = fieldGenerator(size, probability);

      console.table(field);

      const flatField = field.flat();

      expect(flatField.filter(cellWithBombFilter)).toHaveLength(25);
    });

    // @ 2x2 field with 50% probability
    // it("2x2 field with 50% probability", () => {
    //   expect(fieldGenerator(2, 0.5)).toStrictEqual([
    //     [bomb, bomb],
    //     [empty, empty],
    //   ]);
    // });
    // @ 4x4 field with 50% probability
    // it("4x4 field with 50% probability", () => {
    //   expect(fieldGenerator(4, 0.5)).toStrictEqual([
    //     [bomb, bomb, bomb, bomb],
    //     [bomb, bomb, bomb, bomb],
    //     [empty, empty, empty, empty],
    //     [empty, empty, empty, empty],
    //   ]);
    // });
  });
});
