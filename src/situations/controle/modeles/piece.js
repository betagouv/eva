import PieceCommune from 'commun/modeles/piece';

export * from 'commun/modeles/piece';

export default class Piece extends PieceCommune {
  constructor ({ categorie, ...reste }) {
    super(reste);
    this._categorie = categorie;
  }

  categorie () {
    return this._categorie;
  }
}
