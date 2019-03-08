export class Bac {
  constructor ({ x, y, largeur, hauteur }) {
    this._dimensions = { largeur: largeur, hauteur: hauteur };
    this._position = { x: x, y: y };
  }

  dimensions () {
    return this._dimensions;
  }

  position () {
    return this._position;
  }
}
