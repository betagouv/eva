import SituationCommune, { CHANGEMENT_ETAT, DEMARRE, FINI } from 'commun/modeles/situation';
import Piece, { CHANGEMENT_SELECTION, DISPARITION_PIECE, PIECE_BIEN_PLACEE, PIECE_MAL_PLACEE } from 'tri/modeles/piece';
import Bac from 'commun/modeles/bac';

export default class Situation extends SituationCommune {
  constructor ({ pieces, bacs }, maintenant = Date.now) {
    super();
    this.maintenant = maintenant;
    this.date_debut = 0;
    this.resultat = {
      temps_passe: 0,
      erreurs: 0
    };
    this.on(CHANGEMENT_ETAT, (etat) => {
      if (etat === DEMARRE) {
        this.date_debut = maintenant();
      }
    });
    this._pieces = pieces.map((piece) => new Piece({ ...piece, categorie: piece.type, largeur: 7.44, hauteur: 11.3 }));
    this._bacs = bacs.map((bac) => new Bac({ ...bac, largeur: 15, hauteur: 22.5 }));
    this._pieces.forEach((piece) => {
      piece.on(CHANGEMENT_SELECTION, (selectionnee) => {
        if (!selectionnee) {
          const bac = this.bacs().find((bac) => bac.contient(piece));
          if (!bac) return;
          if (bac.correspondALaCategorie(piece)) {
            this.faitDisparaitreLaPiece(piece, bac);
          } else {
            this.comptabiliseErreur(piece, bac);
          }
        }
      });
    });
  }

  faitDisparaitreLaPiece (piece, bac) {
    this._pieces.splice(this._pieces.indexOf(piece), 1);
    piece.emit(DISPARITION_PIECE);
    this.emit(PIECE_BIEN_PLACEE, piece, bac);

    if (this.piecesAffichees().length === 0) {
      this.resultat.temps_passe = this.maintenant() - this.date_debut;
      this.modifieEtat(FINI);
    }
  }

  comptabiliseErreur (piece, bac) {
    this.resultat.erreurs++;
    piece.changePosition(piece.positionOriginelle());
    this.emit(PIECE_MAL_PLACEE, piece, bac);
  }

  piecesAffichees () {
    return this._pieces;
  }

  bacs () {
    return this._bacs;
  }
}
