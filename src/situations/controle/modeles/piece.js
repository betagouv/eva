export class Piece {
  constructor ({ x, y }) {
    this.x = x;
    this.y = y;
  }

  position () {
    return { x: this.x, y: this.y };
  }

  changePosition ({ x, y }) {
    this.x = x;
    this.y = y;
  }
}
