import SituationCommune from 'commun/modeles/situation';
import Piece from 'commun/modeles/piece';
import Bac from 'commun/modeles/bac';

export default class Situation extends SituationCommune {
  constructor ({ pieces, bacs }) {
    super();
    this.pieces = pieces.map((piece) => new Piece({ ...piece, largeur: 7.44, hauteur: 11.3 }));
    this._bacs = bacs.map((bac) => new Bac({ ...bac, largeur: 7.44, hauteur: 11.3 }));
  }

  piecesAffichees () {
    return this.pieces;
  }

  bacs () {
    return this._bacs;
  }
}
