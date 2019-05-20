import SituationCommune from 'commun/modeles/situation';
import Piece from './piece';

export default class Situation extends SituationCommune {
  constructor ({ pieces }) {
    super();
    this.pieces = pieces.map((piece) => new Piece({ ...piece, largeur: 7.44, hauteur: 11.3 }));
  }

  piecesAffichees () {
    return this.pieces;
  }
}
