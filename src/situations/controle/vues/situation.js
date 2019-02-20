import { VuePiece, animationInitiale } from 'controle/vues/piece.js';

export class VueSituation {
  constructor (situation) {
    this.situation = situation;
  }

  affiche (pointInsertion, $) {
    let piece = this.situation.pieceSuivante();
    let vuePiece = new VuePiece(piece, 5000);

    vuePiece.affiche(pointInsertion, $, animationInitiale);
  }
}
