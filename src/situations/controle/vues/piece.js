import VuePieceCommune from 'commun/vues/piece';

export function animationInitiale ($element) {
  $element.animate({ left: '-' + $element.css('width') }, 10000, 'linear');
}

export default class VuePiece extends VuePieceCommune {
  constructor (piece,
    depotRessources,
    callbackApresApparition = animationInitiale) {
    super(piece, depotRessources);

    this.callbackApresApparition = callbackApresApparition;
  }

  affiche (pointInsertion, $) {
    super.affiche(pointInsertion, $);
    this.$piece.show(() => { this.callbackApresApparition(this.$piece); });
  }
}
