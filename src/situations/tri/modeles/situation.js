import SituationCommune from 'commun/modeles/situation';
import Piece, { CHANGEMENT_SELECTION } from 'commun/modeles/piece';
import Bac from 'commun/modeles/bac';

export const DISPARITION_PIECE = 'disparitionPiece';

export default class Situation extends SituationCommune {
  constructor ({ pieces, bacs }) {
    super();
    this.pieces = pieces.map((piece) => new Piece({ ...piece, categorie: piece.type, largeur: 7.44, hauteur: 11.3 }));
    this._bacs = bacs.map((bac) => new Bac({ ...bac, largeur: 15, hauteur: 22.5 }));
    this.pieces.forEach((piece) => {
      const positionInitiale = piece.position();
      piece.on(CHANGEMENT_SELECTION, (selectionnee) => {
        if (!selectionnee) {
          const bac = this.bacs().find((bac) => bac.contient(piece));
          if (bac && bac.correspondALaCategorie(piece)) {
            piece.emit(DISPARITION_PIECE);
          } else {
            piece.changePosition(positionInitiale);
          }
        }
      });
    });
  }

  piecesAffichees () {
    return this.pieces;
  }

  bacs () {
    return this._bacs;
  }
}
