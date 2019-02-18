export class Piece {
  constructor ({ x, y, conforme }) {
    this.x = x;
    this.y = y;
    this.conforme = conforme;
    this.selectionnee = false;
    this.abonnes = [];
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
