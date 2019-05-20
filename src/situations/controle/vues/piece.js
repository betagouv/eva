import VuePieceCommune from 'commun/vues/piece';
import { DISPARITION_PIECE } from 'controle/modeles/situation';

export function animationInitiale ($element) {
  $element.animate({ left: '-' + $element.css('width') }, 10000, 'linear');
}

export function animationFinale ($element, done) {
  $element.fadeOut(500, () => { done($element); });
}

export default class VuePiece extends VuePieceCommune {
  constructor (piece,
    depotRessources,
    callbackApresApparition = animationInitiale,
    callbackAvantSuppression = animationFinale) {
    super(piece, depotRessources);

    this.callbackApresApparition = callbackApresApparition;
    this.callbackAvantSuppression = callbackAvantSuppression;
  }

  affiche (pointInsertion, $) {
    super.affiche(pointInsertion, $);
    this.$piece.show(() => { this.callbackApresApparition(this.$piece); });

    this.piece.on(DISPARITION_PIECE, () => {
      this.$piece.addClass('desactiver');
      this.callbackAvantSuppression(this.$piece, () => {
        this.$piece.remove();
      });
    });
  }
}
