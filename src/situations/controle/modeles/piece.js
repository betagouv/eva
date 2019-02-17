export class Piece {
  constructor ({ x, y }) {
    this.x = x;
    this.y = y;
    this.selectionnee = false;
    this.abonnes = [];
  }

  position () {
    return { x: this.x, y: this.y };
  }

  changePosition ({ x, y }) {
    this.x = x;
    this.y = y;

    this.abonnes.forEach(a => a({ x: x, y: y }));
  }

  quandChangementPosition (nouvelAbonne) {
    this.abonnes.push(nouvelAbonne);
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
