/********************************************************
 *                         CELL                          *
 ********************************************************/
export class Cell {
  constructor(
    x = 0,
    y = 0,
    color = "#000000",
    isActive = false,
    isLocked = false
  ) {
    this.color = color;
    this.isActive = isActive;
    this.isLocked = isLocked;
    this.x = x;
    this.y = y;
  }

  activate() {
    this.isActive = true;
  }

  deactivate() {
    this.isActive = false;
  }

  lock() {
    this.isLocked = true;
  }

  unLock() {
    this.isLocked = false;
  }

  coordsMatch(x, y) {
    return this.x === x && this.y === y;
  }
}
