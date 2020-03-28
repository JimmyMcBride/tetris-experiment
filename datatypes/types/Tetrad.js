import { DOWN, LEFT, RIGHT, ROTATE } from "../../constants";
import { deepCopy } from "../helper";

/********************************************************
 *                       TETROMINO                       *
 ********************************************************/
export class Tetrad {
  constructor(
    type = "",
    color = "#000000",
    prevCoordinates = [],
    coordinates = [],
    orientation = 0,
    rotationalMatrices = []
  ) {
    this.type = type;
    this.color = color;
    this.coordinates = coordinates;
    this.prevCoordinates = prevCoordinates;
    this.orientation = orientation;
    this.rotationalMatrices = rotationalMatrices;
  }

  canMove(direction, matrix) {
    let canMove = true;
    let nextCoordinates = this.nextCoordinates(direction);

    nextCoordinates.forEach(({ x, y }) => {
      if (matrix.outOfBounds(x, y)) {
        canMove = false;
      } else if (matrix.cellAt(x, y).isLocked) {
        canMove = false;
      }
    });

    return canMove;
  }

  getYCoords() {
    const uniqueYCoords = this.coordinates
      .map(coord => coord.y)
      .filter((y, i, yCoords) => {
        return yCoords.indexOf(y === i);
      });

    return uniqueYCoords;
  }

  move(direction) {
    if (direction === ROTATE) {
      return this.rotate();
    }

    this.prevCoordinates = deepCopy(this.coordinates);

    this.coordinates = this.coordinates.map(coord => {
      switch (direction) {
        case DOWN:
          coord.y += 1;
          return coord;
        case LEFT:
          coord.x -= 1;
          return coord;
        case RIGHT:
          coord.x += 1;
          return coord;
        default:
          return coord;
      }
    });

    return this;
  }

  nextCoordinates(direction) {
    if (direction === ROTATE) {
      return this.nextRotationCoords();
    }

    let nextCoordinates = deepCopy(this.coordinates);

    nextCoordinates = nextCoordinates.map(coord => {
      switch (direction) {
        case DOWN:
          coord.y += 1;
          return coord;
        case LEFT:
          coord.x -= 1;
          return coord;
        case RIGHT:
          coord.x += 1;
          return coord;
        default:
          return coord;
      }
    });

    return nextCoordinates;
  }

  nextRotationCoords() {
    const nextDistances = deepCopy(this.rotationalMatrices[this.orientation]);

    let nextCoordinates = deepCopy(this.coordinates);

    nextCoordinates = nextCoordinates.map((coord, i) => {
      coord.x += nextDistances[i].x;
      coord.y += nextDistances[i].y;
      return coord;
    });

    return nextCoordinates;
  }

  rotate() {
    const distances = this.rotationalMatrices[this.orientation];

    this.prevCoordinates = deepCopy(this.coordinates);

    this.coordinates = this.coordinates.map((coord, i) => {
      coord.x += distances[i].x;
      coord.y += distances[i].y;
      return coord;
    });

    this.orientation = this.orientation === 3 ? 0 : ++this.orientation;

    return this;
  }

  unrotate() {
    this.orientation = this.orientation === 0 ? 3 : --this.orientation;

    const distances = this.rotationalMatrices[this.orientation];

    this.coordinates = this.coordinates.map((coord, i) => {
      coord.x += distances[i].x * -1;
      coord.y += distances[i].y * -1;
      return coord;
    });

    return this;
  }
}
