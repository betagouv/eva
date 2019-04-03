export class Bac {
  constructor ({ categorie, x, y, largeur, hauteur }) {
    this._categorie = categorie;
    this._dimensions = { largeur, hauteur };
    this._position = { x, y };
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
