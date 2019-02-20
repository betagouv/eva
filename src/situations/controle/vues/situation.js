import { VuePiece, animationInitiale } from 'controle/vues/piece.js';

export class VueSituation {
  constructor (situation, callbackApresCreationPiece) {
    this.situation = situation;
    this.callbackApresCreationPiece = callbackApresCreationPiece || animationInitiale;
  }

  affiche (pointInsertion, $) {
    let identifiantIntervalle = setInterval(() => {
      if (this.situation.sequenceTerminee()) {
        clearInterval(identifiantIntervalle);
        return;
      }

      let piece = this.situation.pieceSuivante();
      let vuePiece = new VuePiece(piece, this.situation.dureeViePiece());
      vuePiece.affiche(pointInsertion, $, this.callbackApresCreationPiece);
    }, this.situation.cadenceArriveePieces());
  }
}
