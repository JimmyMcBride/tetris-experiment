import { NUM_COLS, NUM_ROWS } from "../../constants";
import { deepCopy } from "../helper";
import { Cell } from "./Cell";

/********************************************************
 *                         MATRIX                          *
 ********************************************************/
// = function(numRows, numCols)
export class Matrix {
  constructor(numRows, numCols) {
    this.numRows = numRows;
    this.numCols = numCols;
    this.matrix = this.initMatrix();
  }
  initMatrix() {
    this.matrix = new Array(this.numRows)
      .fill(0)
      .map(() => new Array(this.numCols).fill(0));

    this.matrix = this.matrix.map((row, y) => {
      return row.map((_, x) => {
        return new Cell(x, y);
      });
    });

    return this.matrix;
  }

  activateCoordinates(tetrad) {
    tetrad.prevCoordinates.forEach(({ x, y }) => {
      this.cellAt(x, y).deactivate();
    });

    tetrad.coordinates.forEach(({ x, y }) => {
      this.cellAt(x, y).activate();
      this.cellAt(x, y).color = tetrad.color;
    });

    return this;
  }

  cellAt(x, y) {
    return this.matrix[y][x];
  }

  outOfBounds(x, y) {
    let x_inBounds = x < NUM_COLS && x >= 0;
    let y_inBounds = y < NUM_ROWS && y >= 0;
    return !(x_inBounds && y_inBounds);
  }

  flatten() {
    return [].concat(...this.matrix);
  }

  lockCoordinates(tetrad) {
    tetrad.coordinates.forEach(({ x, y }) => {
      this.cell(x, y).isLocked = true;
      this.cell(x, y).isActive = false;
    });
  }

  cell(x, y) {
    return this.matrix[y][x];
  }

  rowFilled(row) {
    let filled = true;

    this.matrix[row].forEach(cell => {
      if (cell.isLocked === false) filled = false;
    });

    return filled;
  }

  deleteRow(yCoord) {
    this.matrix[yCoord] = this.matrix[yCoord].map(cell => {
      cell.isLocked = false;
      return cell;
    });
  }

  deleteRows(rows) {
    rows
      .filter((row, i, rows) => rows.indexOf(row) === i)
      .forEach(row => {
        this.matrix[row].forEach(cell => {
          cell.isActive = false;
          cell.isLocked = false;
        });
      });

    return this;
  }

  collapseEmptyRows(deletedRows) {
    let remainingRows = this.matrix.filter((_, y) => {
      return !deletedRows.includes(y);
    });
    let offset = 20 - remainingRows.length;

    for (let y = 19; y >= 0; y--) {
      if (remainingRows[y - offset]) {
        this.matrix[y] = this.matrix[y].map((cell, x) => {
          let remianingCell = deepCopy(remainingRows[y - offset][x]);
          cell = new Cell();
          cell.color = remianingCell.color;
          cell.isLocked = remianingCell.isLocked;
          cell.x = remianingCell.x;
          cell.y = y;
          return cell;
        });
      } else {
        this.matrix[y] = this.matrix[y].map((cell, x) => {
          cell = new Cell(x, y);
          return cell;
        });
      }
    }
  }
}

// Matrix.prototype.initMatrix = function() {
//   this.matrix = new Array(this.numRows)
//     .fill(0)
//     .map(() => new Array(this.numCols).fill(0));

//   this.matrix = this.matrix.map((row, y) => {
//     return row.map((_, x) => {
//       return new Cell(x, y);
//     });
//   });

//   return this.matrix;
// };

/********************************************************
 *                        METHODS                        *
 ********************************************************/
// Matrix.prototype.activateCoordinates = function(tetrad) {
//   tetrad.prevCoordinates.forEach(({ x, y }) => {
//     this.cellAt(x, y).deactivate();
//   });

//   tetrad.coordinates.forEach(({ x, y }) => {
//     this.cellAt(x, y).activate();
//     this.cellAt(x, y).color = tetrad.color;
//   });

//   return this;
// };

// Matrix.prototype.cellAt = function(x, y) {
//   return this.matrix[y][x];
// };

// Matrix.prototype.outOfBounds = function(x, y) {
//   let x_inBounds = x < NUM_COLS && x >= 0;
//   let y_inBounds = y < NUM_ROWS && y >= 0;
//   return !(x_inBounds && y_inBounds);
// };

// Matrix.prototype.flatten = function() {
//   return [].concat(...this.matrix);
// };

// Matrix.prototype.lockCoordinates = function(tetrad) {
//   tetrad.coordinates.forEach(({ x, y }) => {
//     this.cell(x, y).isLocked = true;
//     this.cell(x, y).isActive = false;
//   });
// };

// Matrix.prototype.cell = function(x, y) {
//   return this.matrix[y][x];
// };

// Matrix.prototype.rowFilled = function(row) {
//   let filled = true;

//   this.matrix[row].forEach(cell => {
//     if (cell.isLocked === false) filled = false;
//   });

//   return filled;
// };

// Matrix.prototype.deleteRow = function(yCoord) {
//   this.matrix[yCoord] = this.matrix[yCoord].map(cell => {
//     cell.isLocked = false;
//     return cell;
//   });
// };

// Matrix.prototype.deleteRows = function(rows) {
//   rows
//     .filter((row, i, rows) => rows.indexOf(row) === i)
//     .forEach(row => {
//       this.matrix[row].forEach(cell => {
//         cell.isActive = false;
//         cell.isLocked = false;
//       });
//     });

//   return this;
// };

// Matrix.prototype.collapseEmptyRows = function(deletedRows) {
//   let remainingRows = this.matrix.filter((_, y) => {
//     return !deletedRows.includes(y);
//   });
//   let offset = 20 - remainingRows.length;

//   for (let y = 19; y >= 0; y--) {
//     if (remainingRows[y - offset]) {
//       this.matrix[y] = this.matrix[y].map((cell, x) => {
//         let remianingCell = deepCopy(remainingRows[y - offset][x]);
//         cell = new Cell();
//         cell.color = remianingCell.color;
//         cell.isLocked = remianingCell.isLocked;
//         cell.x = remianingCell.x;
//         cell.y = y;
//         return cell;
//       });
//     } else {
//       this.matrix[y] = this.matrix[y].map((cell, x) => {
//         cell = new Cell(x, y);
//         return cell;
//       });
//     }
//   }
// };
