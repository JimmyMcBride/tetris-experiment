import { Coordinates } from "./../index";
import { NUM_COLS, NUM_ROWS } from "../../constants";
import { deepCopy } from "../helper";
import { Cell } from "./Cell";

/********************************************************
 *                         MATRIX                          *
 ********************************************************/
export class Matrix {
  numRows: any;
  numCols: any;
  matrix: any;
  constructor(numRows: number, numCols: number) {
    this.numRows = numRows;
    this.numCols = numCols;
    this.matrix = this.initMatrix();
  }
  initMatrix() {
    this.matrix = new Array(this.numRows)
      .fill(0)
      .map(() => new Array(this.numCols).fill(0));

    this.matrix = this.matrix.map((row: Array<any>, y: number) => {
      return row.map((_, x) => {
        return new Cell(x, y);
      });
    });

    return this.matrix;
  }

  activateCoordinates(tetrad: any) {
    tetrad.prevCoordinates.forEach(({ x, y }: Coordinates) => {
      this.cellAt(x, y).deactivate();
    });

    tetrad.coordinates.forEach(({ x, y }: Coordinates) => {
      this.cellAt(x, y).activate();
      this.cellAt(x, y).color = tetrad.color;
    });

    return this;
  }

  cellAt(x: number, y: number) {
    return this.matrix[y][x];
  }

  outOfBounds(x: number, y: number) {
    let x_inBounds = x < NUM_COLS && x >= 0;
    let y_inBounds = y < NUM_ROWS && y >= 0;
    return !(x_inBounds && y_inBounds);
  }

  flatten() {
    return [].concat(...this.matrix);
  }

  lockCoordinates(tetrad: any) {
    tetrad.coordinates.forEach(({ x, y }: Coordinates) => {
      this.cell(x, y).isLocked = true;
      this.cell(x, y).isActive = false;
    });
  }

  cell(x: number, y: number) {
    return this.matrix[y][x];
  }

  rowFilled(row: number) {
    let filled = true;

    this.matrix[row].forEach((cell: any) => {
      if (cell.isLocked === false) filled = false;
    });

    return filled;
  }

  deleteRow(yCoord: number) {
    this.matrix[yCoord] = this.matrix[yCoord].map((cell: any) => {
      cell.isLocked = false;
      return cell;
    });
  }

  deleteRows(rows: Array<any>) {
    rows
      .filter((row, i, rows) => rows.indexOf(row) === i)
      .forEach(row => {
        this.matrix[row].forEach((cell: any) => {
          cell.isActive = false;
          cell.isLocked = false;
        });
      });

    return this;
  }

  collapseEmptyRows(deletedRows: any) {
    let remainingRows = this.matrix.filter((_: any, y: number) => {
      return !deletedRows.includes(y);
    });
    let offset = 20 - remainingRows.length;

    for (let y = 19; y >= 0; y--) {
      if (remainingRows[y - offset]) {
        this.matrix[y] = this.matrix[y].map((cell: any, x: number) => {
          let remianingCell = deepCopy(remainingRows[y - offset][x]);
          cell = new Cell();
          cell.color = remianingCell.color;
          cell.isLocked = remianingCell.isLocked;
          cell.x = remianingCell.x;
          cell.y = y;
          return cell;
        });
      } else {
        this.matrix[y] = this.matrix[y].map((cell: any, x: any) => {
          cell = new Cell(x, y);
          return cell;
        });
      }
    }
  }
}
