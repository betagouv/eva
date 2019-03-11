export class Bac {
  constructor ({ categorie, x, y, largeur, hauteur }) {
    this._categorie = categorie;
    this._dimensions = { largeur: largeur, hauteur: hauteur };
    this._position = { x: x, y: y };
  }

  dimensions () {
    return this._dimensions;
  }

  position () {
    return this._position;
  }

  categorie () {
    return this._categorie;
  }
}
