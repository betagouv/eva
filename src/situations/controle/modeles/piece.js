import EventEmitter from 'events';

export const PIECE_CONFORME = true;
export const PIECE_DEFECTUEUSE = false;
export const CHANGEMENT_POSITION = 'changementPosition';

export class Piece extends EventEmitter {
  constructor ({ x, y, conforme, image }) {
    super();
    this.x = x;
    this.y = y;
    this.conforme = conforme;
    this.image = image;
    this.selectionnee = false;
  }

  position () {
    return { x: this.x, y: this.y };
  }

  estConforme () {
    return this.conforme;
  }

  changePosition ({ x, y }) {
    this.x = x;
    this.y = y;

    this.emit(CHANGEMENT_POSITION, { x, y });
  }

  estSelectionnee () {
    return this.selectionnee;
  }

  selectionne ({ x, y }) {
    this.decalageSelection = { dx: x - this.x, dy: y - this.y };
    this.selectionnee = true;
  }

  deselectionne () {
    this.selectionnee = false;
  }

  deplaceSiSelectionnee ({ x, y }) {
    if (this.estSelectionnee()) {
      this.changePosition({ x: x - this.decalageSelection.dx, y: y - this.decalageSelection.dy });
    }
  }
}
