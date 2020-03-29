/********************************************************
 *                         CELL                          *
 ********************************************************/
export class Cell {
  color: string;
  isActive: boolean;
  isLocked: boolean;
  x: number;
  y: number;
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

  coordsMatch(x: number, y: number) {
    return this.x === x && this.y === y;
  }
}
