import { Bac } from 'controle/modeles/bac.js';
import { PIECE_CONFORME, PIECE_DEFECTUEUSE } from 'controle/modeles/piece.js';
import { VueBac } from 'controle/vues/bac.js';
import { VuePiece } from 'controle/vues/piece.js';

export class VueSituation {
  constructor (situation, callbackApresCreationPiece) {
    this.situation = situation;
    this.callbackApresCreationPiece = callbackApresCreationPiece;
  }

  affiche (pointInsertion, $) {
    function afficheBac (categorie, { x, y }) {
      const bacPiecesDefectueuses = new Bac({ categorie: categorie, x: x, y: y, largeur: 30, hauteur: 40 });
      const vueBacPiecesDefectueuses = new VueBac(bacPiecesDefectueuses);
      vueBacPiecesDefectueuses.affiche(pointInsertion, $);
    }

    afficheBac(PIECE_CONFORME, { x: 10, y: 10 });
    afficheBac(PIECE_DEFECTUEUSE, { x: 60, y: 10 });

    let identifiantIntervalle = setInterval(() => {
      if (this.situation.sequenceTerminee()) {
        clearInterval(identifiantIntervalle);
        return;
      }

      let piece = this.situation.pieceSuivante();
      let vuePiece = new VuePiece(piece, this.situation.dureeViePiece(), this.callbackApresCreationPiece);
      vuePiece.affiche(pointInsertion, $);
    }, this.situation.cadenceArriveePieces());
  }
}
