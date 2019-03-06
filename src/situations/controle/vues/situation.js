import { VuePiece } from 'controle/vues/piece.js';

export class VueSituation {
  constructor (situation, callbackApresCreationPiece) {
    this.situation = situation;
    this.callbackApresCreationPiece = callbackApresCreationPiece;
  }

  affiche (pointInsertion, $) {
    let identifiantIntervalle = setInterval(() => {
      if (this.situation.sequenceTerminee()) {
        clearInterval(identifiantIntervalle);
        return;
      }

      let piece = this.situation.pieceSuivante();
      let vuePiece = new VuePiece(piece,
        this.situation.dureeViePiece(),
        this.callbackApresCreationPiece);
      vuePiece.affiche(pointInsertion, $);
    }, this.situation.cadenceArriveePieces());
  }
}
